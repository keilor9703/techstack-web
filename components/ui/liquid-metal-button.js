'use client';

import { liquidMetalFragmentShader, ShaderMount } from '@paper-design/shaders';
import { Sparkles } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

export function LiquidMetalButton({
  label = 'Get Started',
  onClick,
  viewMode = 'text',
  width,
  href,
  target,
  disabled = false,
  type = 'button',
}) {
  const [isHovered, setIsHovered]   = useState(false);
  const [isPressed, setIsPressed]   = useState(false);
  const [ripples,   setRipples]     = useState([]);
  const shaderRef   = useRef(null);
  const shaderMount = useRef(null);
  const buttonRef   = useRef(null);
  const rippleId    = useRef(0);

  const dimensions = useMemo(() => {
    if (viewMode === 'icon') {
      return { width: 46, height: 46, innerWidth: 42, innerHeight: 42, shaderWidth: 46, shaderHeight: 46 };
    }
    const w = width ?? 160;
    return { width: w, height: 46, innerWidth: w - 4, innerHeight: 42, shaderWidth: w, shaderHeight: 46 };
  }, [viewMode, width]);

  useEffect(() => {
    const styleId = 'shader-canvas-style-lmb';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .lmb-shader-container canvas {
          width: 100% !important; height: 100% !important;
          display: block !important; position: absolute !important;
          top: 0 !important; left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes lmb-ripple {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%,-50%) scale(4); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    if (shaderRef.current) {
      if (shaderMount.current?.destroy) shaderMount.current.destroy();
      shaderMount.current = new ShaderMount(
        shaderRef.current,
        liquidMetalFragmentShader,
        {
          u_repetition: 4, u_softness: 0.5,
          u_shiftRed: 0.3,  u_shiftBlue: 0.3,
          u_distortion: 0,  u_contour: 0,
          u_angle: 45,      u_scale: 8,
          u_shape: 1,       u_offsetX: 0.1, u_offsetY: -0.1,
        },
        undefined,
        0.6,
      );
    }

    return () => { shaderMount.current?.destroy?.(); shaderMount.current = null; };
  }, []);

  const handleMouseEnter = () => { if (disabled) return; setIsHovered(true);  shaderMount.current?.setSpeed?.(1); };
  const handleMouseLeave = () => { if (disabled) return; setIsHovered(false); setIsPressed(false); shaderMount.current?.setSpeed?.(0.6); };

  const handleClick = (e) => {
    if (disabled) return;
    shaderMount.current?.setSpeed?.(2.4);
    setTimeout(() => shaderMount.current?.setSpeed?.(isHovered ? 1 : 0.6), 300);

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const ripple = { x: e.clientX - rect.left, y: e.clientY - rect.top, id: rippleId.current++ };
      setRipples(prev => [...prev, ripple]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== ripple.id)), 600);
    }

    if (href) {
      if (target === '_blank') {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = href;
      }
    }
    onClick?.();
  };

  const shadow = isPressed
    ? '0px 0px 0px 1px rgba(0,0,0,0.5), 0px 1px 2px 0px rgba(0,0,0,0.3)'
    : isHovered
    ? '0px 0px 0px 1px rgba(0,0,0,0.4), 0px 12px 6px 0px rgba(0,0,0,0.05), 0px 8px 5px 0px rgba(0,0,0,0.1), 0px 4px 4px 0px rgba(0,0,0,0.15), 0px 1px 2px 0px rgba(0,0,0,0.2)'
    : '0px 0px 0px 1px rgba(0,0,0,0.3), 0px 9px 9px 0px rgba(0,0,0,0.12), 0px 2px 5px 0px rgba(0,0,0,0.15)';

  const pressed = `translateY(${isPressed ? '1px' : '0'}) scale(${isPressed ? '0.98' : '1'})`;

  return (
    <div className="relative inline-block" style={{ perspective: '1000px', perspectiveOrigin: '50% 50%', opacity: disabled ? 0.5 : 1 }}>
      <div style={{ position: 'relative', width: dimensions.width, height: dimensions.height, transformStyle: 'preserve-3d', transition: 'all 0.8s cubic-bezier(0.34,1.56,0.64,1)' }}>

        {/* Label / icon layer */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transform: 'translateZ(20px)', zIndex: 30, pointerEvents: 'none' }}>
          {viewMode === 'icon' && (
            <Sparkles size={16} style={{ color: '#e0e0e0', filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.8))' }} />
          )}
          {viewMode === 'text' && (
            <span style={{ fontSize: 14, color: '#e0e0e0', fontWeight: 600, textShadow: '0px 1px 3px rgba(0,0,0,0.8)', whiteSpace: 'nowrap', fontFamily: 'Sora, sans-serif' }}>
              {label}
            </span>
          )}
        </div>

        {/* Inner dark pill */}
        <div style={{ position: 'absolute', inset: 0, transform: `translateZ(10px) ${pressed}`, zIndex: 20, transition: 'all 0.8s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.15s ease' }}>
          <div style={{ width: dimensions.innerWidth, height: dimensions.innerHeight, margin: 2, borderRadius: 100, background: 'linear-gradient(180deg,#202020 0%,#000 100%)', boxShadow: isPressed ? 'inset 0px 2px 4px rgba(0,0,0,0.4)' : 'none' }} />
        </div>

        {/* Shader border layer */}
        <div style={{ position: 'absolute', inset: 0, transform: `translateZ(0px) ${pressed}`, zIndex: 10, transition: 'all 0.8s cubic-bezier(0.34,1.56,0.64,1)' }}>
          <div style={{ width: dimensions.width, height: dimensions.height, borderRadius: 100, boxShadow: shadow, transition: 'box-shadow 0.15s ease', background: 'transparent' }}>
            <div ref={shaderRef} className="lmb-shader-container" style={{ borderRadius: 100, overflow: 'hidden', position: 'relative', width: dimensions.shaderWidth, height: dimensions.shaderHeight }} />
          </div>
        </div>

        {/* Invisible click target */}
        <button
          ref={buttonRef}
          type={type}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={() => !disabled && setIsPressed(true)}
          onMouseUp={() => !disabled && setIsPressed(false)}
          disabled={disabled}
          aria-label={label}
          style={{ position: 'absolute', inset: 0, background: 'transparent', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', zIndex: 40, transform: 'translateZ(25px)', borderRadius: 100, overflow: 'hidden' }}
        >
          {ripples.map(r => (
            <span key={r.id} style={{ position: 'absolute', left: r.x, top: r.y, width: 20, height: 20, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.4) 0%,transparent 70%)', pointerEvents: 'none', animation: 'lmb-ripple 0.6s ease-out' }} />
          ))}
        </button>
      </div>
    </div>
  );
}
