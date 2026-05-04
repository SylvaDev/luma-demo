"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

import LumaTileScene from "./luma/LumaTileScene";

export default function LumaTileBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 origin-center scale-[1.02]"
        style={{
          perspective: "1400px",
          transform: "rotateX(6deg) translateY(-1.5%)",
          transformStyle: "preserve-3d",
        }}
      >
        <Canvas
          className="h-full w-full"
          gl={{
            alpha: false,
            antialias: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          dpr={[1, 2]}
          camera={{ position: [0, 0.4, 7.25], fov: 40, near: 0.1, far: 120 }}
          onCreated={({ gl }) => {
            gl.setClearColor("#030208", 1);
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.08;
            gl.outputColorSpace = THREE.SRGBColorSpace;
          }}
        >
          <Suspense fallback={null}>
            <LumaTileScene />
          </Suspense>
        </Canvas>
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/80"
        style={{ mixBlendMode: "multiply" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}
