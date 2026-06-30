'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const sizeMap = {
  sm:  'px-4 py-2 text-sm',
  md:  'px-5 py-2.5 text-sm',
  lg:  'px-6 py-3 text-base',
  xl:  'px-8 py-4 text-lg',
};

export function LiquidButton({
  children,
  className = '',
  size = 'md',
  onClick,
  href,
  ...props
}) {
  const ref   = useRef(null);
  const mx    = useMotionValue(0);
  const my    = useMotionValue(0);
  const smx   = useSpring(mx, { stiffness: 150, damping: 18 });
  const smy   = useSpring(my, { stiffness: 150, damping: 18 });

  // Blob follows cursor inside button
  const blobX = useTransform(smx, v => `${v}px`);
  const blobY = useTransform(smy, v => `${v}px`);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top  - rect.height / 2);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  const classes = [
    'relative overflow-hidden inline-flex items-center justify-center gap-2',
    'font-sora font-semibold select-none cursor-pointer',
    'rounded-full transition-colors duration-200',
    'backdrop-blur-md',
    sizeMap[size] ?? sizeMap.md,
    className,
  ].join(' ');

  const inner = (
    <motion.span
      ref={ref}
      className={classes}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.18)',
        boxShadow: '0 4px 24px rgba(46,104,230,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
      }}
      {...props}
    >
      {/* Liquid blob that follows the cursor */}
      <motion.span
        className="pointer-events-none absolute rounded-full blur-xl"
        style={{
          width: '60%',
          paddingBottom: '60%',
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(46,104,230,0.3) 60%, transparent 100%)',
        }}
      />
      {/* Shine line */}
      <span
        className="pointer-events-none absolute inset-x-4 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}
      />
      <span className="relative z-10">{children}</span>
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {inner}
      </a>
    );
  }
  return <button onClick={onClick} className="inline-block bg-transparent p-0 border-0">{inner}</button>;
}
