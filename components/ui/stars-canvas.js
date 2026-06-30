'use client';

import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export default function StarsCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }} style={{ width: '100%', height: '100%' }}>
      <Stars radius={80} count={3000} factor={4} fade speed={1.5} />
    </Canvas>
  );
}
