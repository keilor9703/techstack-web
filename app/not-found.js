'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-grafito flex items-center justify-center relative overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6A6F7E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-azul/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block font-mono text-xs text-azulStack tracking-widest uppercase mb-6">
            Error 404
          </span>

          <h1 className="font-sora font-black text-[8rem] lg:text-[14rem] text-white leading-none tracking-tighter mb-0 select-none">
            4<span className="text-azul">0</span>4
          </h1>

          <p className="font-sora font-semibold text-xl text-white/70 mb-3 -mt-2">
            Esta ruta no existe en nuestro sistema.
          </p>
          <p className="font-sora text-sm text-white/30 leading-relaxed mb-10 max-w-sm mx-auto">
            Si llegaste aquí por un enlace roto, cuéntanos. Si llegaste por curiosidad, bienvenido al equipo.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-azul text-white font-semibold text-sm rounded-xl hover:bg-blue-600 transition-colors font-sora shadow-lg shadow-azul/30"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio
            </Link>
            <Link
              href="/ksmart360"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white font-semibold text-sm rounded-xl hover:border-white/40 hover:bg-white/5 transition-all font-sora"
            >
              Ver Ksmart360
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
