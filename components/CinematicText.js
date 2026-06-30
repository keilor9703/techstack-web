'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function CinematicHeading({ children, className = '', as: Tag = 'h2', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const words = String(children).split(' ');

  return (
    <Tag ref={ref} className={`overflow-hidden ${className}`} aria-label={String(children)}>
      <span className="flex flex-wrap gap-x-[0.28em] gap-y-0">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{
                duration: 0.75,
                delay: delay + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

export function CinematicReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 48, scale: 0.96 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function CinematicImage({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 }}
        animate={
          inView
            ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }
            : { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 }
        }
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
