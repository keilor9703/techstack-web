'use client';

import { motion } from 'framer-motion';
import { CinematicHeading, CinematicReveal } from '@/components/CinematicText';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';

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
    <section id="servicios" className="py-24 lg:py-32 bg-grafito relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #2E68E6 0%, transparent 70%)' }} />
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6A6F7E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-xs font-mono font-medium text-azul bg-azul/15 border border-azul/20 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase"
          >
            Lo que hacemos
          </motion.span>
          <CinematicHeading
            className="font-sora font-light text-4xl lg:text-5xl xl:text-6xl text-white leading-tight tracking-tight"
            delay={0.1}
          >
            Nuestros Servicios
          </CinematicHeading>
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
              className="group"
              style={{ perspective: '1000px' }}
            >
              {/* Flip card container */}
              <div
                className="relative w-full transition-transform duration-700 ease-in-out"
                style={{
                  transformStyle: 'preserve-3d',
                  minHeight: '320px',
                  transform: 'rotateY(0deg)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotateY(180deg)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotateY(0deg)'; }}
              >
                {/* Front face */}
                <div
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  {service.badge && (
                    <span className="absolute top-6 right-6 text-xs font-semibold font-sora text-azul bg-azul/15 border border-azul/20 px-2.5 py-1 rounded-full">
                      {service.badge}
                    </span>
                  )}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6" style={{ background: 'linear-gradient(135deg, #2E68E6 0%, #7C3AED 100%)' }}>
                    {service.icon}
                  </div>
                  <h3 className="font-sora font-normal text-xl text-white mb-3 tracking-normal">
                    {service.title}
                  </h3>
                  <p className="font-sora text-sm text-white/55 leading-relaxed flex-1">
                    {service.description.substring(0, 80)}…
                  </p>
                  <p className="mt-4 font-sora text-xs text-azul/70 font-medium">Pasa el cursor para saber más →</p>
                </div>

                {/* Back face */}
                <div
                  className="absolute inset-0 rounded-2xl p-8 flex flex-col"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, #2E68E6 0%, #7C3AED 100%)',
                  }}
                >
                  <h3 className="font-sora font-semibold text-lg text-white mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="font-sora text-sm text-white/85 leading-relaxed flex-1">
                    {service.description}
                  </p>
                  {service.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 mb-5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono text-white/80 bg-white/15 px-2.5 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <a
                    href="#contacto"
                    onClick={(e) => { e.preventDefault(); setTimeout(() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-white font-sora hover:gap-3 transition-all duration-200"
                  >
                    Solicitar información
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* WhatsApp automation banner */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 lg:mt-10 relative overflow-hidden rounded-2xl px-8 py-10 lg:px-14 lg:py-12 flex flex-col lg:flex-row items-center lg:items-center gap-8"
          style={{ background: 'linear-gradient(135deg, rgba(37,211,102,0.08) 0%, rgba(18,140,126,0.12) 100%)', border: '1px solid rgba(37,211,102,0.2)' }}
        >
          <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(37,211,102,0.15) 0%, transparent 70%)' }} />
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(18,140,126,0.12) 0%, transparent 70%)' }} />

          <div className="relative flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.968-1.301A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="#25D366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="relative flex-1 text-center lg:text-left">
            <p className="text-xs font-mono font-medium tracking-widest uppercase mb-2" style={{ color: '#25D366' }}>
              Automatización con IA · WhatsApp Business
            </p>
            <h3 className="font-sora font-light text-2xl lg:text-3xl text-white leading-snug tracking-normal mb-3">
              Tu WhatsApp vende, responde y toma pedidos — solo
            </h3>
            <p className="font-sora text-sm text-white/55 leading-relaxed max-w-2xl">
              Integramos un agente de IA a tu WhatsApp Business que atiende clientes 24/7: responde preguntas, muestra el catálogo, consulta stock, gestiona horarios y <strong className="text-white/80">registra pedidos automáticamente</strong> en Ksmart360, Excel, tu CRM o cualquier sistema. Para tiendas, restaurantes, clínicas, o cualquier negocio que quiera dejar de contestar lo mismo todo el día.
            </p>
          </div>

          <div className="relative flex-shrink-0">
            <LiquidMetalButton
              label="Quiero automatizar mi WhatsApp"
              onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
              width={260}
            />
          </div>
        </motion.div>

        {/* Web design marketing banner */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 lg:mt-10 relative overflow-hidden rounded-2xl bg-grafito px-8 py-10 lg:px-14 lg:py-12 flex flex-col lg:flex-row items-center lg:items-center gap-8"
        >
          {/* decorative glow */}
          <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(46,104,230,0.3) 0%, transparent 70%)' }} />
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)' }} />

          {/* icon */}
          <div className="relative flex-shrink-0 w-16 h-16 rounded-2xl bg-azulStack/15 border border-azulStack/30 flex items-center justify-center text-azulStack">
            <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>

          {/* copy */}
          <div className="relative flex-1 text-center lg:text-left">
            <p className="text-xs font-mono font-medium text-azulStack tracking-widest uppercase mb-2">
              Diseño &amp; Construcción Web
            </p>
            <h3 className="font-sora font-light text-2xl lg:text-3xl text-white leading-snug tracking-normal mb-3">
              ¿Tu empresa todavía no tiene página web?
            </h3>
            <p className="font-sora text-sm text-white/55 leading-relaxed max-w-xl">
              Una presencia digital profesional no es un lujo — es la primera impresión que tus clientes tienen de ti.
              Diseñamos y construimos sitios web modernos, rápidos y optimizados para posicionamiento, adaptados
              a la identidad de tu marca.
            </p>
          </div>

          {/* CTA */}
          <div className="relative flex-shrink-0">
            <LiquidMetalButton
              label="Quiero mi página web"
              onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
              width={210}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
