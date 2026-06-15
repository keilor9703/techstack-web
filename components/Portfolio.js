'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Ksmart360',
    description: 'Sistema ERP/POS SaaS multi-módulo desplegado en Oracle Cloud. Gestión completa para empresas colombianas con facturación electrónica DIAN integrada.',
    tags: ['SaaS', 'FastAPI', 'React', 'Oracle Cloud'],
    gradient: 'from-azul to-blue-400',
    accentColor: '#2E68E6',
    ctaLabel: 'Probar gratis',
    ctaHref: 'https://www.appjeylor.com/',
    ctaExternal: true,
    badge: { text: 'Producto propio', style: 'azul' },
  },
  {
    title: 'Sistema de Lavadero',
    description: 'Gestión de órdenes, trabajadores y reportes para lavaderos de vehículos. Seguimiento en tiempo real del estado de cada vehículo.',
    tags: ['React', 'FastAPI', 'PostgreSQL'],
    gradient: 'from-indigo-500 to-azul',
    accentColor: '#6366F1',
    ctaLabel: 'Solicitar información',
    ctaHref: '#contacto',
    ctaExternal: false,
    badge: { text: 'Módulo de Ksmart360', style: 'gray' },
  },
  {
    title: 'POS Restaurante',
    description: 'Punto de venta con pantalla de cocina en tiempo real, gestión de mesas, comandas digitales y sistema de reservas integrado.',
    tags: ['React', 'WebSocket', 'FastAPI'],
    gradient: 'from-blue-500 to-cyan-400',
    accentColor: '#3B82F6',
    ctaLabel: 'Solicitar información',
    ctaHref: '#contacto',
    ctaExternal: false,
    badge: { text: 'Módulo de Ksmart360', style: 'gray' },
  },
  {
    title: 'Facturación Electrónica DIAN',
    description: 'Integración completa con la DIAN para emisión de facturas electrónicas en formato UBL 2.1. Validación en tiempo real y gestión de notas crédito.',
    tags: ['DIAN API', 'Python', 'XML'],
    gradient: 'from-sky-500 to-azul',
    accentColor: '#0EA5E9',
    ctaLabel: 'Solicitar información',
    ctaHref: '#contacto',
    ctaExternal: false,
    badge: { text: 'Módulo de Ksmart360', style: 'gray' },
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Portfolio() {
  return (
    <section id="portafolio" className="py-24 lg:py-32 bg-papel">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-xs font-mono font-medium text-azul bg-tinte px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase"
          >
            Lo que hemos construido
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-sora font-bold text-3xl lg:text-4xl xl:text-5xl text-grafito leading-tight tracking-tight"
          >
            Ksmart360 y sus capacidades
          </motion.h2>
          <motion.p variants={itemVariants} className="font-sora text-base text-acero mt-4 max-w-2xl mx-auto leading-relaxed">Ksmart360 concentra años de desarrollo especializado. Sus módulos no son productos separados — son capacidades integradas de un mismo sistema construido para el mercado colombiano.</motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 cursor-default flex flex-col"
            >
              {/* Gradient accent bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-sora font-bold text-xl text-grafito tracking-tight">
                    {project.title}
                  </h3>
                  {project.badge.style === 'azul' ? (
                    <span className="flex items-center gap-1.5 text-xs font-mono text-azulStack bg-azulTinte border border-azulStack/20 px-2.5 py-1 rounded-full ml-3 flex-shrink-0">
                      {project.badge.text}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-mono text-acero bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full ml-3 flex-shrink-0">
                      {project.badge.text}
                    </span>
                  )}
                </div>

                <p className="font-sora text-sm text-acero leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-acero bg-gray-100 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.ctaHref}
                  {...(project.ctaExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : { onClick: (e) => { e.preventDefault(); setTimeout(() => document.querySelector(project.ctaHref)?.scrollIntoView({ behavior: 'smooth' }), 50); } }
                  )}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-azulStack font-sora hover:gap-3 transition-all duration-200"
                >
                  {project.ctaLabel}
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
