'use client';

import { useEffect, useRef } from 'react';

// Fixed full-viewport star field, visible across every section/page regardless
// of light or dark background (mix-blend-mode handles contrast automatically).
// Frame rate is throttled to ~24fps to keep compositing cost low and avoid
// reintroducing scroll jank.
export default function GlobalStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let stars = [];
    const COUNT = 140;
    const FRAME_INTERVAL = 1000 / 24;
    let lastFrame = 0;

    const populate = () => {
      stars = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1 + 0.3,
        speed: Math.random() * 0.0025 + 0.0012,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      populate();
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = (t) => {
      animId = requestAnimationFrame(draw);
      if (t - lastFrame < FRAME_INTERVAL) return;
      lastFrame = t;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const a = 0.25 + 0.45 * Math.abs(Math.sin(s.phase + t * s.speed));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.fill();
      }
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-30 pointer-events-none"
      style={{ width: '100vw', height: '100vh', mixBlendMode: 'difference', opacity: 0.45 }}
    />
  );
}
