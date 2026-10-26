'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CadConsole from '@/components/falcon/CadConsole';

const features = [
  'Recepción multicanal: 123, WhatsApp, API, videollamada',
  'Despacho de unidades en tiempo real',
  'Policía, Bomberos, Defensa Civil, Ejército, Salud y Comisarías',
  'Google ELS: ubicación GPS automática del ciudadano',
  'Bitácora inmutable de auditoría por caso',
  'Oracle Cloud región Bogotá + respaldo on-premise',
];

const statsData = [
  { label: 'Canales de entrada', value: '6+' },
  { label: 'Disponibilidad', value: '99.9%' },
  { label: 'Operación', value: '24/7' },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function FalconCadFeature() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="falcon-cad" className="relative bg-[#050A14] py-24 lg:py-32 overflow-hidden">
      <div className="absolute -top-40 -left-20 w-[560px] h-[560px] rounded-full blur-[120px] opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 65%)' }} />
      <div className="absolute -bottom-40 right-0 w-[560px] h-[560px] rounded-full blur-[120px] opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #1D4ED8 0%, transparent 65%)' }} />
      <div className="absolute inset-0 grid-fade opacity-60 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-falcon-cyan/50 to-transparent" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-14 lg:gap-16 items-center">
          {/* Console */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 12 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 [perspective:1400px]"
          >
            <CadConsole compact />
          </motion.div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/falcon/falcon-mark.png" alt="" className="w-8 h-8 object-contain" />
                </span>
                <span className="font-mono text-[11px] font-medium tracking-[0.2em] uppercase text-falcon-cyan">
                  Producto propio · Gestión de emergencias
                </span>
              </div>

              <h2 className="font-display font-bold text-5xl lg:text-6xl text-white leading-[0.95] tracking-[-0.04em] mb-5">
                FALCON <span className="text-gradient-falcon">CAD</span>
              </h2>
              <p className="font-display text-2xl text-white/80 leading-snug mb-4">
                Cada segundo cuenta. Por eso conectamos al ciudadano con todas las agencias de respuesta.
              </p>
              <p className="font-sora text-sm text-white/50 leading-relaxed mb-8">
                Plataforma para recibir, clasificar, coordinar y hacer seguimiento a cada emergencia del{' '}
                <strong className="text-white/70">123</strong> — desde la llamada hasta el cierre del caso.
              </p>

              <div className="flex gap-8 mb-8">
                {statsData.map((s) => (
                  <div key={s.label}>
                    <p className="font-display font-bold text-3xl text-gradient-falcon">{s.value}</p>
                    <p className="font-sora text-xs text-white/40 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/falcon-cad"
                className="group inline-flex items-center gap-2 px-6 py-3.5 font-sora font-semibold text-sm rounded-2xl text-[#050A14] bg-gradient-to-r from-falcon-cyan to-falcon-sky hover:brightness-110 transition shadow-[0_10px_40px_-8px_rgba(34,211,238,0.6)] mb-10"
              >
                Conocer FALCON CAD
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {features.map((f) => (
                <motion.li key={f} variants={itemVariants} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center bg-falcon-cyan/15 border border-falcon-cyan/30">
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#22D3EE">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="font-sora text-sm text-white/70 leading-snug">{f}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
