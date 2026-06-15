'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: '¿Cuánto cuesta Ksmart360?',
    a: 'Ksmart360 tiene tres planes de pago: Básico ($29.900/mes), Pro ($49.900/mes con facturación electrónica DIAN) y Vitalicio (pago único, por asignación). También ofrecemos 14 días de prueba gratuita con acceso completo, sin tarjeta de crédito.',
  },
  {
    q: '¿Puedo probar Ksmart360 antes de pagar?',
    a: 'Sí. Tienes 14 días de acceso completo a todos los módulos sin costo y sin tarjeta de crédito. Al registrarte, un wizard de configuración guiado te ayuda a configurar tu empresa en minutos.',
  },
  {
    q: '¿Ksmart360 funciona sin conexión a internet?',
    a: 'Ksmart360 es una plataforma web (SaaS), por lo que requiere conexión a internet para operar. Esta arquitectura garantiza que tus datos siempre estén respaldados, actualizados y accesibles desde cualquier dispositivo.',
  },
  {
    q: '¿Ksmart360 se integra con la DIAN para facturación electrónica?',
    a: 'Sí. El plan Pro incluye integración completa con la DIAN bajo estándar UBL 2.1, con generación de CUFE, código QR y firma digital en cada factura. También gestiona resoluciones de facturación y te alerta antes de que venzan.',
  },
  {
    q: '¿Cuánto tiempo toma implementar un software a medida?',
    a: 'Depende del alcance del proyecto. Proyectos pequeños (módulos puntuales, integraciones) toman entre 2 y 6 semanas. Plataformas completas pueden tomar de 2 a 4 meses. En todos los casos arrancamos con un análisis de requisitos para darte un estimado preciso antes de empezar.',
  },
  {
    q: '¿Mis datos están seguros en Ksmart360?',
    a: 'Sí. Ksmart360 opera sobre 7 capas de seguridad independientes: Cloudflare como escudo perimetral, CDN con HTTPS forzado, firewalls de red y sistema operativo, proxy inverso con SSL, API con JWT y rate limiting, y base de datos aislada sin acceso externo. Además soporta autenticación biométrica WebAuthn/FIDO2.',
  },
  {
    q: '¿En qué ciudades tienen cobertura?',
    a: 'Operamos desde Cali, Colombia, pero atendemos clientes en todo el país de forma remota. Nuestros sistemas son 100% en la nube, por lo que la ubicación geográfica no es un limitante para ningún servicio.',
  },
  {
    q: '¿Ofrecen soporte técnico?',
    a: 'Sí. Todos los planes de Ksmart360 incluyen soporte. El plan Pro tiene soporte prioritario. Para proyectos de software a medida, ofrecemos acompañamiento post-entrega y mantenimiento. Puedes contactarnos por email, WhatsApp o a través del formulario de esta página.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
            Preguntas frecuentes
          </span>
          <h2 className="font-sora font-bold text-3xl lg:text-4xl xl:text-5xl text-grafito leading-tight tracking-tight">
            Resolvemos tus dudas
          </h2>
          <p className="font-sora text-base text-acero mt-4 leading-relaxed">
            Las preguntas más comunes sobre Ksmart360 y nuestros servicios.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden"
        >
          {faqs.map((faq, i) => (
            <div key={i} className="bg-papel">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-azulTinte/30 transition-colors duration-200 gap-4"
              >
                <span className="font-sora font-semibold text-sm text-grafito leading-snug">
                  {faq.q}
                </span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${open === i ? 'bg-azulStack text-white' : 'bg-gray-100 text-acero'}`}>
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={open === i ? 'M18 12H6' : 'M12 6v12M6 12h12'} />
                  </svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 font-sora text-sm text-acero leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center font-sora text-sm text-acero mt-10"
        >
          ¿Tienes otra pregunta?{' '}
          <a
            href="#contacto"
            onClick={(e) => { e.preventDefault(); setTimeout(() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
            className="text-azulStack font-semibold hover:underline"
          >
            Escríbenos directamente
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}
