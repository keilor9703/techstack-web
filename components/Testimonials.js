'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const testimonials = [
  {
    quote:
      'Con Ksmart360 pasamos de llevar el inventario en cuadernos a tenerlo en tiempo real desde el celular. La diferencia es brutal — ahora sé exactamente cuánto tengo sin contar nada a mano.',
    name: 'Calzado EYA',
    role: 'Tienda de calzado · Cali',
    initials: 'EYA',
    color: '#2E68E6',
  },
  {
    quote:
      'La facturación electrónica con la DIAN nos quitó un dolor de cabeza enorme. Antes tardábamos horas, ahora facturamos en segundos. El contador solo revisa, ya no tiene que hacer nada manual.',
    name: 'Vialmar Cacao',
    role: 'Agroindustria · Colombia',
    initials: 'VC',
    color: '#7C3AED',
  },
  {
    quote:
      'Los pedidos por WhatsApp nos cambiaron la operación. El agente los recibe, los registra y nosotros solo nos preocupamos por preparar y entregar. Menos errores, más ventas, menos estrés.',
    name: 'Peletería Jeylor',
    role: 'Retail cuero · Cali',
    initials: 'PJ',
    color: '#0EA5E9',
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="relative bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 hover:bg-white/8 transition-all duration-300"
      style={{
        boxShadow: `0 0 0 0 ${testimonial.color}00`,
      }}
      whileHover={{ y: -6, boxShadow: `0 20px 40px -12px ${testimonial.color}25`, transition: { duration: 0.25 } }}
    >
      {/* Quote mark */}
      <div
        className="absolute top-6 right-8 text-6xl leading-none font-serif select-none pointer-events-none"
        style={{ color: testimonial.color, opacity: 0.2 }}
      >
        "
      </div>

      <StarRating />

      <p className="font-sora text-white/70 text-sm leading-relaxed flex-1 mb-6 italic">
        "{testimonial.quote}"
      </p>

      {/* Client info */}
      <div className="flex items-center gap-3 pt-5 border-t border-white/10">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold font-sora flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${testimonial.color} 0%, ${testimonial.color}99 100%)` }}
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="font-sora font-semibold text-white text-sm">{testimonial.name}</p>
          <p className="font-sora text-white/40 text-xs">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-grafito relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6A6F7E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5 pointer-events-none" style={{ background: 'radial-gradient(circle, #2E68E6 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono font-medium text-azul bg-azul/15 border border-azul/20 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
            Lo que dicen nuestros clientes
          </span>
          <h2 className="font-sora font-light text-4xl lg:text-5xl xl:text-6xl text-white leading-tight tracking-tight">
            Empresas que ya digitalizaron
          </h2>
          <p className="mt-4 font-sora text-white/50 text-lg max-w-xl mx-auto">
            Resultados reales de negocios colombianos que confiaron en Tech Stack Colombia.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} delay={i * 0.12} />
          ))}
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap justify-center gap-8 lg:gap-16 pt-12 border-t border-white/10"
        >
          {[
            { value: '30+', label: 'Empresas activas' },
            { value: '100%', label: 'Clientes satisfechos' },
            { value: '14 días', label: 'Prueba gratuita Ksmart360' },
            { value: '24h', label: 'Tiempo de respuesta' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-sora font-light text-3xl text-white">{stat.value}</p>
              <p className="font-sora text-xs text-white/40 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
