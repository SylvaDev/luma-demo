/** Vertex: instanced planes + grid id for fragment animation */

export const tileVertexShader = /* glsl */ `
/* instanceMatrix is declared by Three.js for InstancedMesh — do not redeclare */
attribute vec2 aGrid;

varying vec2 vUv;
varying vec2 vGrid;
varying vec3 vViewNormal;
varying vec3 vViewPosition;

void main() {
  vUv = uv;
  vGrid = aGrid;

  vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  vViewNormal = normalize(normalMatrix * mat3(instanceMatrix) * normal);

  gl_Position = projectionMatrix * mvPosition;
}
`;

/**
 * Fragment: acrylic frame (edge darkening), caustic bands, theme mix, interaction ripples
 */
export const tileFragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uScroll;
uniform float uThemeBlend;
uniform float uReducedMotion;
uniform vec2 uPointerGrid;
uniform float uPointerStrength;
uniform vec3 uColorWarm;
uniform vec3 uColorWarmDeep;
uniform vec3 uColorCyan;
uniform vec3 uColorCyanDeep;
uniform vec3 uRipple0;
uniform vec3 uRipple1;
uniform vec3 uRipple2;
uniform vec3 uRipple3;

varying vec2 vUv;
varying vec2 vGrid;
varying vec3 vViewNormal;
varying vec3 vViewPosition;

float rippleRing(vec2 grid, vec3 ripple) {
  float age = ripple.z;
  if (age >= 1.0 || age <= 0.0) return 0.0;
  vec2 center = ripple.xy;
  float dist = length(grid - center);
  float radius = age * 15.0;
  float ring = abs(dist - radius);
  float edge = smoothstep(2.8, 0.0, ring);
  return (1.0 - age) * edge * 0.55;
}

void main() {
  vec2 edge = min(vUv, 1.0 - vUv);
  float inner = min(edge.x, edge.y);
  float frame = smoothstep(0.0, 0.14, inner);
  float frameSharp = smoothstep(0.0, 0.05, inner);

  float t = uTime * (0.4 + 0.6 * (1.0 - uReducedMotion));
  float s = uScroll * (0.3 + 0.7 * (1.0 - uReducedMotion));

  float waveA = sin(vGrid.x * 0.22 + vGrid.y * 0.14 + t * 1.1 + s);
  float waveB = sin(vGrid.y * 0.18 - vGrid.x * 0.11 + t * 0.75);
  float waveC = sin((vGrid.x + vGrid.y) * 0.17 + t * 0.45 + s * 2.0);

  float caustic =
    sin(vGrid.x * 0.38 + t * 1.25) *
    sin(vGrid.y * 0.31 - t * 0.92) * 0.5 + 0.5;

  float pulse = waveA * 0.35 + waveB * 0.28 + waveC * 0.22;
  pulse = pulse * 0.5 + 0.5;

  vec3 warmLite = mix(uColorWarmDeep, uColorWarm, pulse * (0.55 + 0.45 * frame));
  vec3 cyanLite = mix(uColorCyanDeep, uColorCyan, pulse * (0.55 + 0.45 * frame));

  vec3 baseCol = mix(warmLite, cyanLite, uThemeBlend);
  baseCol *= 0.72 + 0.28 * caustic;

  vec2 pg = uPointerGrid;
  float pd = length(vGrid - pg);
  float pointerBoost = uPointerStrength * exp(-(pd * pd) / 22.0);

  float rb = 0.0;
  rb += rippleRing(vGrid, uRipple0);
  rb += rippleRing(vGrid, uRipple1);
  rb += rippleRing(vGrid, uRipple2);
  rb += rippleRing(vGrid, uRipple3);

  float intensity = clamp(0.14 + 0.72 * frame + 0.36 * pointerBoost + rb, 0.0, 2.8);

  vec3 eyeDir = normalize(vViewPosition);
  vec3 N = normalize(vViewNormal);
  float fresnel = pow(clamp(1.0 - abs(dot(N, eyeDir)), 0.0, 1.0), 2.2);
  float edgeGlow = (1.0 - frameSharp) * (0.25 + 0.55 * fresnel);

  vec3 emissive = baseCol * intensity + edgeGlow * mix(uColorWarm, uColorCyan, uThemeBlend);

  gl_FragColor = vec4(emissive, 1.0);
}
`;
