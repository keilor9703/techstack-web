'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Ksmart360 — POS & ERP',
    description: 'Sistema ERP/POS SaaS multi-módulo desplegado en Oracle Cloud. Facturación electrónica DIAN, inventario, reportes financieros y más de 18 módulos integrados.',
    tags: ['SaaS', 'FastAPI', 'React', 'Oracle Cloud'],
    gradient: 'from-azul to-blue-400',
    screenshot: '/screenshots/pos-ventas.png',
    screenshotAlt: 'Módulo Ventas POS de Ksmart360',
    ctaLabel: 'Probar gratis',
    ctaHref: 'https://www.techstackcol.com/ksmart360',
    ctaExternal: true,
    badge: { text: 'Producto propio', style: 'azul' },
  },
  {
    title: 'Catálogo Virtual — Calzado EYA',
    description: 'Tienda online en vivo con catálogo de productos, carrito, checkout por WhatsApp y "Powered by Ksmart360". Operando en appjeylor.com/calzadoeya.',
    tags: ['Catálogo Virtual', 'WhatsApp Checkout', 'Ksmart360'],
    gradient: 'from-pink-500 to-rose-400',
    screenshot: '/screenshots/catalogo-eya.png',
    screenshotAlt: 'Catálogo virtual de Calzado EYA en Ksmart360',
    ctaLabel: 'Ver catálogo en vivo',
    ctaHref: 'https://www.appjeylor.com/calzadoeya',
    ctaExternal: true,
    badge: { text: 'Caso real', style: 'azul' },
  },
  {
    title: 'Reportes Financieros',
    description: 'Dashboard analítico con flujo de caja, rendimiento comercial, eficiencia de cobranza, distribución de ventas y más de 10 vistas de análisis.',
    tags: ['React', 'FastAPI', 'PostgreSQL'],
    gradient: 'from-indigo-500 to-azul',
    screenshot: '/screenshots/reportes.png',
    screenshotAlt: 'Módulo de Reportes Financieros de Ksmart360',
    ctaLabel: 'Solicitar información',
    ctaHref: '#contacto',
    ctaExternal: false,
    badge: { text: 'Módulo de Ksmart360', style: 'gray' },
  },
  {
    title: 'Onboarding en 2 minutos',
    description: 'Registro guiado por tipo de negocio, tamaño de equipo y datos fiscales. 14 días gratis, sin tarjeta. El negocio queda listo para operar de inmediato.',
    tags: ['UX', 'React', 'FastAPI'],
    gradient: 'from-sky-500 to-azul',
    screenshot: '/screenshots/registro.png',
    screenshotAlt: 'Formulario de registro de Ksmart360',
    ctaLabel: 'Crear cuenta gratis',
    ctaHref: 'https://www.appjeylor.com/',
    ctaExternal: true,
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
            className="font-sora font-bold text-4xl lg:text-5xl xl:text-6xl text-grafito dark:text-white leading-tight tracking-tight"
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
              className="group bg-white dark:bg-[#13161F] border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden hover:border-gray-200 dark:hover:border-white/20 hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-black/40 transition-all duration-300 cursor-default flex flex-col"
            >
              {/* Screenshot preview */}
              {project.screenshot && (
                <div className="relative overflow-hidden bg-[#0A0C12] border-b border-white/5" style={{ height: '200px' }}>
                  <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${project.gradient}`} />
                  <img
                    src={project.screenshot}
                    alt={project.screenshotAlt}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-sora font-bold text-xl text-grafito dark:text-white tracking-tight">
                    {project.title}
                  </h3>
                  {project.badge.style === 'azul' ? (
                    <span className="flex items-center gap-1.5 text-xs font-mono text-azulStack bg-azulTinte border border-azulStack/20 px-2.5 py-1 rounded-full ml-3 flex-shrink-0">
                      {project.badge.text}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-mono text-acero bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-2.5 py-1 rounded-full ml-3 flex-shrink-0">
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
                      className="text-xs font-mono text-acero bg-gray-100 dark:bg-white/10 px-2.5 py-1 rounded-md"
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
