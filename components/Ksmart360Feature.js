'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const features = [
  { text: 'Punto de Venta (POS) táctil y rápido' },
  { text: 'Facturación Electrónica DIAN (UBL 2.1)' },
  { text: 'Control de inventario en tiempo real' },
  { text: 'Módulo de lavadero de vehículos' },
  { text: 'Restaurante con comanda digital' },
  { text: 'Gestión de parqueadero' },
  { text: 'Programa de fidelización y puntos' },
  { text: 'Reportes y dashboards analíticos' },
  { text: 'Multi-empresa y multi-sede' },
  { text: 'Desplegado en Oracle Cloud (OCI)' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const statsData = [
  { label: 'Módulos activos', value: '18+' },
  { label: 'Empresas usando', value: '30+' },
  { label: 'Uptime garantizado', value: '99.9%' },
];

export default function Ksmart360Feature() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="ksmart360" className="relative bg-grafito py-24 lg:py-32 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[600px] w-full pointer-events-none overflow-hidden">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-azul/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text + features */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-5">
                {/* K logo mark */}
                <img src="/ksmart360-logo.svg" alt="Ksmart360" className="w-14 h-14 flex-shrink-0" />
                <span className="text-xs font-mono font-medium text-azul tracking-widest uppercase">
                  Producto estrella · v2.2.0
                </span>
              </div>
              <h2 className="font-sora font-bold text-3xl lg:text-4xl xl:text-5xl text-white leading-tight mb-4">
                Ksmart360
              </h2>
              <p className="font-sora text-lg text-white/60 leading-relaxed mb-3">
                El ERP & POS más completo para el mercado colombiano
              </p>
              <p className="font-sora text-sm text-white/40 leading-relaxed mb-8">
                Una plataforma SaaS multi-módulo construida desde cero para las necesidades
                reales de empresas colombianas. Desde la tienda hasta la nube, todo conectado
                y en tiempo real.
              </p>

              <Link
                href="/ksmart360"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-azul text-white font-semibold text-sm rounded-xl hover:bg-blue-600 transition-colors duration-200 font-sora mb-10"
              >
                Probar gratis
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

            {/* Feature list */}
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {features.map((f) => (
                <motion.li
                  key={f.text}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 bg-azul/20 border border-azul/30 rounded-full flex items-center justify-center">
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} className="text-azul">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="font-sora text-sm text-white/70 leading-snug">{f.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right: Real screenshots */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Main screenshot — POS */}
            <div className="relative w-full max-w-lg">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10">
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#0A0C12] border-b border-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="ml-3 flex-1 bg-white/5 rounded-md px-3 py-1 text-xs font-mono text-white/30 truncate">
                    app.ksmart360.com · Ventas (POS)
                  </span>
                </div>
                <img
                  src="/screenshots/pos-ventas.png"
                  alt="Módulo de Ventas POS de Ksmart360"
                  className="w-full block"
                />
              </div>

              {/* Floating secondary screenshot — Reportes */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-8 -left-8 w-56 rounded-xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 hidden sm:block"
              >
                <div className="flex items-center gap-1 px-3 py-2 bg-[#0A0C12] border-b border-white/5">
                  <span className="w-2 h-2 rounded-full bg-red-500/70" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
                  <span className="w-2 h-2 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-xs font-mono text-white/30">Reportes</span>
                </div>
                <img
                  src="/screenshots/reportes.png"
                  alt="Módulo de Reportes Financieros de Ksmart360"
                  className="w-full block"
                />
              </motion.div>

              {/* Live badge */}
              <div className="absolute top-16 -right-4 flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono px-3 py-1.5 rounded-full backdrop-blur-sm hidden lg:flex">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                En producción
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
