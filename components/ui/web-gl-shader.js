'use client';

import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

// Prismatic light-beam shader: bright white core + chromatic dispersion on dark bg
const FRAG = `
precision mediump float;
uniform float u_time;
uniform vec2  u_resolution;

// Smooth spectral palette: maps 0→1 to violet→cyan→white→yellow→red
vec3 spectral(float t) {
  t = clamp(t, 0.0, 1.0);
  vec3 a = vec3(0.10, 0.00, 0.30);
  vec3 b = vec3(0.00, 0.50, 0.80);
  vec3 c = vec3(1.00, 1.00, 1.00);
  vec3 d = vec3(1.00, 0.60, 0.00);
  vec3 e = vec3(0.90, 0.10, 0.00);

  if (t < 0.25) return mix(a, b, t * 4.0);
  if (t < 0.50) return mix(b, c, (t - 0.25) * 4.0);
  if (t < 0.75) return mix(c, d, (t - 0.50) * 4.0);
  return            mix(d, e, (t - 0.75) * 4.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  float T = u_time * 0.14;

  // Beam path: sits in the LOWER third of the screen so it never covers text
  float bx = uv.x;
  float by = 0.82
           - bx * 0.22
           + 0.018 * sin(bx * 4.5 + T)
           + 0.008 * sin(bx * 10.0 - T * 1.2);

  // Signed distance from beam (positive = above beam / toward top)
  float d = by - uv.y;   // positive above the line, negative below

  // ── Core white beam — much thinner ───────────────────────────
  float core = exp(-abs(d) * 220.0) * 2.8;

  // ── Soft glow halo ───────────────────────────────────────────
  float halo = exp(-abs(d) * 55.0) * 0.35;

  // ── Chromatic / spectral dispersion BELOW the beam ───────────
  float below  = clamp(-d * 22.0, 0.0, 1.0);
  float spread = exp(-max(-d, 0.0) * 9.0) * (1.0 - exp(-max(-d, 0.0) * 200.0));
  vec3  spec   = spectral(below) * spread * 1.5;

  // ── Faint warm flare ABOVE the beam ──────────────────────────
  float above = clamp(d * 35.0, 0.0, 1.0) * exp(-d * 18.0) * 0.25;
  vec3  flare = vec3(1.0, 0.88, 0.65) * above;

  // ── Compose ─────────────────────────────────────────────────
  vec3 col = vec3(0.018, 0.018, 0.030);   // near-black base
  col += spec;
  col += flare;
  col += vec3(halo * 0.55, halo * 0.62, halo);
  col += vec3(core);

  // Vignette — keep corners very dark so beam is the focal point
  vec2  vig  = uv - vec2(0.5, 0.5);
  float vign = 1.0 - smoothstep(0.30, 0.95, dot(vig * vec2(1.0, 1.5), vig * vec2(1.0, 1.5)));
  col *= max(vign, 0.06);

  // Horizontal edge fade
  float xFade = smoothstep(0.0, 0.05, uv.x) * smoothstep(1.0, 0.95, uv.x);
  col *= mix(0.05, 1.0, xFade);

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function initGL(canvas) {
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return null;

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };

  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

  const loc = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  return {
    gl,
    uTime: gl.getUniformLocation(prog, 'u_time'),
    uRes:  gl.getUniformLocation(prog, 'u_resolution'),
  };
}

export function WebGLShader({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = initGL(canvas);
    if (!ctx) return;
    const { gl, uTime, uRes } = ctx;

    let animId;
    const start = performance.now();

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width  = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const frame = (now) => {
      resize();
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uRes,  canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(frame);
    };
    animId = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
