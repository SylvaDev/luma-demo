"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { damp } from "maath/easing";
import { useLayoutEffect, useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

import { useTileTheme } from "@/app/context/ThemeContext";
import { tileFragmentShader, tileVertexShader } from "./tileShaders";

const MAX_RIPPLES = 20;
const RIPPLE_UNIFORMS = 4;

type Ripple = { col: number; row: number; t0: number };

const emptyRipple = () => new THREE.Vector3(-1, -1, 2);

function buildGridLayout(
  viewW: number,
  viewH: number,
  compact: boolean
): {
  cols: number;
  rows: number;
  pitch: number;
  tileW: number;
  tileH: number;
} {
  let pitch = compact ? 0.36 : 0.29;
  let cols = Math.ceil(viewW / pitch) + 4;
  let rows = Math.ceil(viewH / pitch) + 4;
  const maxInst = compact ? 3200 : 5200;
  while (cols * rows > maxInst) {
    pitch *= 1.06;
    cols = Math.ceil(viewW / pitch) + 4;
    rows = Math.ceil(viewH / pitch) + 4;
  }
  const gutter = pitch * 0.12;
  const tileW = pitch - gutter;
  const tileH = pitch - gutter;
  return { cols, rows, pitch, tileW, tileH };
}

function createTileMaterial() {
  const m = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uThemeBlend: { value: 0 },
      uReducedMotion: { value: 0 },
      uPointerGrid: { value: new THREE.Vector2(-50, -50) },
      uPointerStrength: { value: 0 },
      uColorWarm: { value: new THREE.Color("#ff6a2e") },
      uColorWarmDeep: { value: new THREE.Color("#5c1208") },
      uColorCyan: { value: new THREE.Color("#3ae8ff") },
      uColorCyanDeep: { value: new THREE.Color("#05384a") },
      uRipple0: { value: emptyRipple() },
      uRipple1: { value: emptyRipple() },
      uRipple2: { value: emptyRipple() },
      uRipple3: { value: emptyRipple() },
    },
    vertexShader: tileVertexShader,
    fragmentShader: tileFragmentShader,
    transparent: false,
    depthWrite: true,
    depthTest: true,
  });
  // Enables WebGL instancing attributes (instanceMatrix) for InstancedMesh
  (m as unknown as THREE.Material & { instancing: boolean }).instancing = true;
  return m;
}

export default function LumaTileScene() {
  const { theme } = useTileTheme();
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const themeBlendSmooth = useRef({ value: 0 });
  const ripplesRef = useRef<Ripple[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const reducedMotionRef = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { size, clock } = useThree();

  const aspect = size.width / Math.max(size.height, 1);
  const dist = 7.25;
  const fov = (40 * Math.PI) / 180;
  const viewH = 2 * Math.tan(fov / 2) * dist;
  const viewW = viewH * aspect;

  const compact = size.width < 640;
  const { cols, rows, pitch, tileW, tileH } = useMemo(
    () => buildGridLayout(viewW, viewH, compact),
    [viewW, viewH, compact]
  );

  const count = cols * rows;

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(tileW, tileH, 1, 1);
    const grid = new Float32Array(count * 2);
    let k = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        grid[k++] = col;
        grid[k++] = row;
      }
    }
    g.setAttribute("aGrid", new THREE.InstancedBufferAttribute(grid, 2));
    return g;
  }, [count, cols, rows, tileW, tileH]);

  const [material] = useState(() => createTileMaterial());

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const ox = ((cols - 1) * pitch) / 2;
    const oy = ((rows - 1) * pitch) / 2;

    let i = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dummy.position.set(col * pitch - ox, row * pitch - oy, 0);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        i++;
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [cols, rows, pitch, dummy, count]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reducedMotionRef.current = mql.matches ? 1 : 0;
    };
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => {
      pointerRef.current.active = false;
    };
    const onDown = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const col = (e.clientX / w) * cols;
      const row = (1 - e.clientY / h) * rows;
      ripplesRef.current.push({ col, row, t0: performance.now() });
      if (ripplesRef.current.length > MAX_RIPPLES) {
        ripplesRef.current.shift();
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [cols, rows]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const mat = mesh.material as THREE.ShaderMaterial;

    const targetBlend = theme === "cyan" ? 1 : 0;
    damp(themeBlendSmooth.current, "value", targetBlend, 0.32, delta);
    mat.uniforms.uThemeBlend.value = themeBlendSmooth.current.value;

    mat.uniforms.uTime.value = clock.elapsedTime;
    mat.uniforms.uScroll.value = window.scrollY * 0.0015;
    mat.uniforms.uReducedMotion.value = reducedMotionRef.current;

    const { x, y, active } = pointerRef.current;
    mat.uniforms.uPointerGrid.value.set(
      active ? (x / window.innerWidth) * cols : -80,
      active ? (1 - y / window.innerHeight) * rows : -80
    );
    mat.uniforms.uPointerStrength.value = active ? 1 : 0;

    const now = performance.now();
    ripplesRef.current = ripplesRef.current.filter((r) => now - r.t0 < 2200);

    const ru = [mat.uniforms.uRipple0, mat.uniforms.uRipple1, mat.uniforms.uRipple2, mat.uniforms.uRipple3];
    for (let r = 0; r < RIPPLE_UNIFORMS; r++) {
      const src = ripplesRef.current[r];
      const u = ru[r].value as THREE.Vector3;
      if (!src) {
        u.set(-1, -1, 2);
      } else {
        const age = (now - src.t0) / 2000;
        u.set(src.col, src.row, Math.min(1, age));
      }
    }

    mesh.rotation.y = Math.sin(clock.elapsedTime * 0.05) * 0.012 * (1 - reducedMotionRef.current);
  });

  return (
    <>
      <group rotation={[-0.11, 0, 0]} position={[0, -0.15, 0]}>
        <instancedMesh
          key={`${cols}x${rows}`}
          ref={meshRef}
          args={[geometry, material, count]}
          frustumCulled={false}
        />
      </group>

      <EffectComposer multisampling={4} enableNormalPass={false}>
        <Bloom
          intensity={1.15}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.92}
          mipmapBlur
          radius={0.58}
        />
      </EffectComposer>
    </>
  );
}
