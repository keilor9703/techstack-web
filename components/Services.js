'use client';

import { motion } from 'framer-motion';

const services = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Desarrollo de Software a Medida',
    description:
      'Construimos plataformas web y sistemas empresariales adaptados exactamente a tu operación. Desde APIs hasta interfaces complejas, entregamos software que escala con tu negocio.',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Oracle Cloud'],
    badge: null,
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Ksmart360 — ERP & POS',
    description:
      'Nuestro sistema SaaS para gestión empresarial: punto de venta, inventario, facturación electrónica DIAN, módulo de lavadero, restaurante, parqueadero y más.',
    tags: [],
    badge: 'Producto propio',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Consultoría Tecnológica',
    description:
      'Acompañamos a tu equipo en la adopción de tecnología: arquitectura de sistemas, migración a la nube, optimización de procesos y estrategia digital.',
    tags: ['Arquitectura', 'Cloud Migration', 'Strategy'],
    badge: null,
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

export default function Services() {
  return (
    <section id="servicios" className="py-24 lg:py-32 bg-white">
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
            className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase"
          >
            Lo que hacemos
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-sora font-bold text-3xl lg:text-4xl xl:text-5xl text-grafito leading-tight tracking-tight"
          >
            Nuestros Servicios
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative bg-papel border border-gray-100 rounded-2xl p-8 hover:border-azulStack/40 hover:shadow-xl hover:shadow-azulStack/8 transition-all duration-300 cursor-default flex flex-col"
            >
              {service.badge && (
                <span className="absolute top-6 right-6 text-xs font-semibold font-sora text-azulStack bg-azulTinte px-2.5 py-1 rounded-full">
                  {service.badge}
                </span>
              )}
              <div className="w-12 h-12 bg-azulTinte rounded-xl flex items-center justify-center text-azulStack mb-6 group-hover:bg-azulStack group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="font-sora font-semibold text-xl text-grafito mb-3 tracking-tight">
                {service.title}
              </h3>
              <p className="font-sora text-sm text-acero leading-relaxed mb-6 flex-1">
                {service.description}
              </p>
              {service.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-acero bg-gray-100 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <a
                href="#contacto"
                onClick={(e) => { e.preventDefault(); setTimeout(() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-azulStack font-sora hover:gap-3 transition-all duration-200"
              >
                Solicitar información
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
