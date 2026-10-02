'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { CinematicImage } from '@/components/CinematicText';

const features = [
  { text: 'Recepción multicanal: 123, WhatsApp, API, videollamada' },
  { text: 'Despacho CAD de unidades en tiempo real' },
  { text: 'Coordinación multi-agencia (Bomberos, Policía, SAMU…)' },
  { text: 'Google ELS — ubicación GPS automática del ciudadano' },
  { text: 'Bitácora inmutable de auditoría por caso' },
  { text: 'RBAC dinámico: roles y permisos por municipio' },
  { text: 'Integración con planta telefónica (PBX / screen-pop)' },
  { text: 'Arquitectura multi-tenant — un sistema, N municipios' },
  { text: 'Nube Oracle Cloud · región Bogotá + respaldo on-premise' },
  { text: 'API abierta: cualquier app puede reportar emergencias' },
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
  { label: 'Canales de entrada', value: '6+' },
  { label: 'Uptime Oracle Cloud', value: '99.9%' },
  { label: 'Multi-tenant', value: 'N municipios' },
];

export default function FalconCadFeature() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="falcon-cad" className="relative bg-grafito py-24 lg:py-32 overflow-hidden">
      {/* Glow esmeralda */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[600px] w-full pointer-events-none overflow-hidden">
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: 'rgba(16,185,129,0.06)' }} />
      </div>
      {/* Separador superior */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: screenshot — imagen va a la izquierda para alternar con Ksmart360 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative w-full max-w-lg">
              {/* Screenshot principal */}
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#0A0C12] border-b border-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="ml-3 flex-1 bg-white/5 rounded-md px-3 py-1 text-xs font-mono text-white/30 truncate">
                    falcon.techstackcol.com · Inicio de sesión
                  </span>
                </div>
                <CinematicImage delay={0.3}>
                  <Image
                    src="/screenshots/LoginFalcon.png"
                    alt="FALCON CAD — Pantalla de inicio de sesión"
                    width={800}
                    height={500}
                    className="w-full block"
                    loading="lazy"
                  />
                </CinematicImage>
              </div>

              {/* Floating badge — canales */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-6 -right-6 bg-[#0A0C12] border border-white/10 rounded-xl px-4 py-3 shadow-2xl shadow-black/60 hidden sm:block"
              >
                <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1.5">Canales activos</p>
                <div className="flex items-center gap-2 text-sm">
                  <span title="123">📞</span>
                  <span title="WhatsApp">💬</span>
                  <span title="API">🔗</span>
                  <span title="Videollamada">📹</span>
                  <span title="Google ELS">📍</span>
                  <span title="App/Web">🌐</span>
                </div>
              </motion.div>

              {/* Live badge */}
              <div className="absolute top-16 -left-4 flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full backdrop-blur-sm hidden lg:flex" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#10B981' }} />
                En producción
              </div>
            </div>
          </motion.div>

          {/* Right: texto + features */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-5">
                {/* Ícono emergencias */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}>
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <span className="text-xs font-mono font-medium tracking-widest uppercase" style={{ color: '#10B981' }}>
                  Producto propio · SaaS para municipios
                </span>
              </div>

              <h2 className="font-sora font-light text-3xl lg:text-4xl xl:text-5xl text-white leading-tight mb-4">
                FALCON CAD
              </h2>
              <p className="font-sora text-lg text-white/60 leading-relaxed mb-3">
                Plataforma nacional para la gestión integral de emergencias
              </p>
              <p className="font-sora text-sm text-white/40 leading-relaxed mb-8">
                Diseñada para recibir, clasificar, coordinar y hacer seguimiento a cada llamada
                al <strong className="text-white/60">123</strong>. Centraliza la operación en tiempo real,
                facilita la interoperabilidad entre entidades de respuesta y optimiza la atención
                a la ciudadanía — desde la llamada hasta el cierre del caso.
              </p>

              {/* Stats */}
              <div className="flex gap-8 mb-8">
                {statsData.map((s, i) => (
                  <div key={i}>
                    <p className="font-sora font-light text-xl text-white">{s.value}</p>
                    <p className="font-sora text-xs text-white/40 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/falcon-cad"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-semibold text-sm rounded-xl transition-colors duration-200 font-sora mb-10"
                style={{ background: '#10B981' }}
                onMouseEnter={e => e.currentTarget.style.background = '#059669'}
                onMouseLeave={e => e.currentTarget.style.background = '#10B981'}
              >
                Ver página de FALCON CAD
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
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" strokeWidth={3} style={{ stroke: '#10B981' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <span className="font-sora text-sm text-white/70 leading-snug">{f.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

        </div>
      </div>
    </section>
  );
}
