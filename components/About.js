'use client';

import { motion } from 'framer-motion';
import { CinematicHeading, CinematicReveal } from '@/components/CinematicText';

const pillars = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Ingeniería de alto nivel',
    description:
      'Arquitecturas robustas, código limpio y sistemas escalables construidos con las tecnologías utilizadas por las empresas más avanzadas del mundo.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: 'Foco en el negocio',
    description:
      'No solo escribimos código. Entendemos tu operación, identificamos cuellos de botella y diseñamos soluciones que impactan directamente en tus resultados.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    title: 'Infraestructura enterprise',
    description:
      'Nuestros productos corren sobre Oracle Cloud Infrastructure, la misma plataforma utilizada por instituciones financieras y gobiernos a nivel mundial.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-papel">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase"
          >
            Nuestra filosofía
          </motion.span>
          <CinematicHeading
            className="font-sora font-bold text-4xl lg:text-6xl xl:text-7xl text-grafito dark:text-white leading-tight tracking-tighter mb-6"
            delay={0.1}
          >
            Construimos. No consultamos.
          </CinematicHeading>
          <motion.p
            variants={itemVariants}
            className="font-sora text-base lg:text-lg text-acero leading-relaxed"
          >
            No somos una agencia que subcontrata ni una consultora que cobra por hora. Somos un equipo
            de ingenieros colombianos con producto propio en producción — Ksmart360 — que además
            construye software a medida para empresas que necesitan soluciones reales, no presentaciones
            en PowerPoint.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {pillars.map((pillar, i) => (
            <CinematicReveal key={i} delay={i * 0.12} className="group bg-white dark:bg-[#13161F] border border-gray-100 dark:border-white/10 rounded-2xl p-8 hover:border-azulStack/30 hover:shadow-lg hover:shadow-azulStack/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 transition-all duration-300 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, #2E68E6 0%, #7C3AED 100%)' }}>
                {pillar.icon}
              </div>
              <h3 className="font-sora font-semibold text-lg text-grafito dark:text-white mb-3 tracking-tight">
                {pillar.title}
              </h3>
              <p className="font-sora text-sm text-acero leading-relaxed">
                {pillar.description}
              </p>
            </CinematicReveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
