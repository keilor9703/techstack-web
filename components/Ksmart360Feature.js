'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
  { label: 'Módulos activos', value: '12+' },
  { label: 'Empresas usando', value: '30+' },
  { label: 'Uptime garantizado', value: '99.9%' },
];

export default function Ksmart360Feature() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="ksmart360" className="bg-grafito py-24 lg:py-32 overflow-hidden">
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
              <span className="text-xs font-mono font-medium text-azul tracking-widest uppercase mb-4 block">
                Producto estrella
              </span>
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

              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-azul text-white font-semibold text-sm rounded-xl hover:bg-blue-600 transition-colors duration-200 font-sora mb-10"
              >
                Solicitar demo gratuita
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
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

          {/* Right: Mock Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-sm lg:max-w-md">
              {/* Dashboard card */}
              <div className="bg-[#0D0F16] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 py-4 bg-[#0A0C12] border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-azul rounded-full" />
                    <span className="font-sora font-bold text-white text-sm">Ksmart360</span>
                    <span className="text-white/30 text-xs font-mono ml-1">v2.0</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-green-400 font-mono">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    En vivo
                  </span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5">
                  {statsData.map((s) => (
                    <div key={s.label} className="px-4 py-4 text-center">
                      <div className="font-sora font-bold text-white text-xl mb-0.5">{s.value}</div>
                      <div className="text-white/40 text-xs font-sora">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Sales chart mock */}
                <div className="p-5 border-b border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-sora text-sm font-semibold text-white">Ventas del mes</span>
                    <span className="font-mono text-xs text-green-400">+18.4%</span>
                  </div>
                  {/* Bar chart */}
                  <div className="flex items-end gap-1.5 h-16">
                    {[40, 65, 48, 72, 55, 80, 62, 90, 70, 85, 60, 95].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm bg-azul/30 relative overflow-hidden">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-azul rounded-sm"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-white/20 text-xs font-mono">
                    <span>Ene</span>
                    <span>Jun</span>
                    <span>Dic</span>
                  </div>
                </div>

                {/* Module pills */}
                <div className="p-5">
                  <span className="font-sora text-xs text-white/40 mb-3 block">Módulos activos</span>
                  <div className="flex flex-wrap gap-2">
                    {['POS', 'DIAN', 'Inventario', 'Restaurante', 'Lavadero', 'Parqueadero', 'Fidelización'].map((mod) => (
                      <span key={mod} className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/60 text-xs font-mono rounded-lg">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
