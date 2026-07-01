'use client';

import { cn } from '@/lib/utils';

export function DottedSurface({
  children,
  className,
  dotColor   = 'rgba(255,255,255,0.25)',
  dotSize    = 1.5,
  dotSpacing = 24,
  ...props
}) {
  const svgDot = `<svg xmlns='http://www.w3.org/2000/svg' width='${dotSpacing}' height='${dotSpacing}'><circle cx='${dotSpacing / 2}' cy='${dotSpacing / 2}' r='${dotSize}' fill='${dotColor}'/></svg>`;
  const encoded = `url("data:image/svg+xml,${encodeURIComponent(svgDot)}")`;

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ backgroundImage: encoded }}
      {...props}
    >
      {children}
    </div>
  );
}
