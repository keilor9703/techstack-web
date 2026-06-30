'use client';

import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform float u_time;
uniform vec2  u_resolution;

// Smooth pseudo-noise using sin harmonics
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i),           hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p  = p * 2.0 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

// Brand palette: grafito → azul (#2E68E6) → violeta (#7C3AED)
vec3 brandColor(float t) {
  vec3 dark    = vec3(0.086, 0.094, 0.122); // #16181F grafito
  vec3 azul    = vec3(0.180, 0.408, 0.902); // #2E68E6
  vec3 violeta = vec3(0.486, 0.227, 0.929); // #7C3AED
  vec3 mid     = vec3(0.120, 0.150, 0.260); // deep navy

  t = clamp(t, 0.0, 1.0);
  if (t < 0.33) return mix(dark, mid,     t * 3.0);
  if (t < 0.66) return mix(mid,  azul,   (t - 0.33) * 3.0);
  return              mix(azul,  violeta,(t - 0.66) * 3.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv.y    = 1.0 - uv.y; // flip Y

  float t = u_time * 0.12;

  // Two layers of warped fbm for organic motion
  vec2 warp = vec2(
    fbm(uv * 2.3 + vec2(t * 0.4,  t * 0.3)),
    fbm(uv * 2.3 + vec2(t * 0.35, t * 0.45 + 5.2))
  );
  float c = fbm(uv * 1.8 + warp * 0.9 + t * 0.15);

  // Radial vignette — keep centre bright, edges dark
  float vignette = 1.0 - smoothstep(0.4, 1.1,
    length((uv - 0.5) * vec2(1.0, 1.2)));

  c = c * 0.7 + 0.15;          // clamp range so it never goes full-white
  c = clamp(c * vignette, 0.0, 1.0);

  gl_FragColor = vec4(brandColor(c), 1.0);
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
  gl.attachShader(prog, compile(gl.VERTEX_SHADER,   VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

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
    let start = performance.now();

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
      gl.uniform2f(uRes, canvas.width, canvas.height);
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
