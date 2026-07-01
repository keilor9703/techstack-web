'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function InputField({ label, id, type = 'text', placeholder, value, onChange, required }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-grafito dark:text-white mb-1.5 font-sora">
        {label}
        {required && <span className="text-azulStack ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-grafito font-sora text-sm placeholder-gray-400 outline-none focus:border-azulStack focus:ring-2 focus:ring-azulStack/20 transition-all duration-200 dark:bg-[#0C0E15] dark:border-white/10 dark:text-white dark:placeholder-white/30"
      />
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    servicio: '',
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError('Hubo un problema al enviar el mensaje. Por favor intenta de nuevo o escríbenos directamente a contacto@techstackcol.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-white dark:bg-[#0C0E15]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.span
              variants={itemVariants}
              className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte px-3 py-1.5 rounded-full mb-5 tracking-wider uppercase"
            >
              Contacto
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-sora font-light text-4xl lg:text-5xl xl:text-6xl text-grafito dark:text-white leading-tight tracking-tight mb-5"
            >
              ¿Listo para transformar tu negocio con tecnología?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-acero text-base lg:text-lg leading-relaxed mb-10"
            >
              Cuéntanos sobre tu empresa y los retos que enfrentas. Nuestro equipo
              analizará tu caso y te presentará una propuesta adaptada a tu operación.
            </motion.p>

            {/* Contact info */}
            <motion.div variants={containerVariants} className="space-y-5">
              {/* Email */}
              <motion.a
                variants={itemVariants}
                href="mailto:contacto@techstackcol.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-azulTinte flex items-center justify-center flex-shrink-0 group-hover:bg-azulStack transition-colors duration-200">
                  <svg
                    className="w-5 h-5 text-azulStack group-hover:text-white transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-acero font-mono mb-0.5">Email</p>
                  <p className="text-grafito dark:text-white font-sora font-medium text-sm group-hover:text-azulStack transition-colors duration-200">
                    contacto@techstackcol.com
                  </p>
                </div>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                variants={itemVariants}
                href="https://wa.me/573132354086?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-colors duration-200">
                  <svg
                    className="w-5 h-5 text-green-500 group-hover:text-white transition-colors duration-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-acero font-mono mb-0.5">WhatsApp</p>
                  <p className="text-grafito dark:text-white font-sora font-medium text-sm group-hover:text-green-600 transition-colors duration-200">
                    Escríbenos por WhatsApp
                  </p>
                </div>
              </motion.a>

              {/* Location */}
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-acero"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-acero font-mono mb-0.5">Ubicación</p>
                  <p className="text-grafito dark:text-white font-sora font-medium text-sm">Cali, Colombia</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right column — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
              <span className="font-sora text-xs text-acero">Respondemos en menos de <strong className="text-grafito dark:text-white">24 horas</strong> · Lunes a sábado</span>
            </div>
            {submitted ? (
              <div className="bg-azulTinte border border-azulStack/20 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 bg-azulStack rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-sora font-normal text-xl text-grafito dark:text-white mb-2">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-acero text-sm leading-relaxed">
                  Gracias por contactarnos. Nuestro equipo revisará tu mensaje y te
                  responderá a la brevedad, generalmente en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-[#13161F] border border-gray-100 dark:border-white/10 rounded-2xl p-8 shadow-sm dark:shadow-none space-y-5"
              >
                <div>
                  <label htmlFor="servicio" className="block text-sm font-medium text-grafito dark:text-white mb-1.5 font-sora">
                    ¿Qué necesitas? <span className="text-azulStack">*</span>
                  </label>
                  <select
                    id="servicio"
                    value={form.servicio}
                    onChange={handleChange('servicio')}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-grafito font-sora text-sm outline-none focus:border-azulStack focus:ring-2 focus:ring-azulStack/20 transition-all duration-200 dark:bg-[#0C0E15] dark:border-white/10 dark:text-white dark:placeholder-white/30"
                  >
                    <option value="">Selecciona una opción...</option>
                    <option value="ksmart360">Ksmart360 — ERP & POS</option>
                    <option value="software-medida">Desarrollo de software a medida</option>
                    <option value="pagina-web">Diseño y construcción de página web</option>
                    <option value="consultoria">Consultoría tecnológica</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField
                    label="Nombre"
                    id="nombre"
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={handleChange('nombre')}
                    required
                  />
                  <InputField
                    label="Empresa"
                    id="empresa"
                    placeholder="Nombre de la empresa"
                    value={form.empresa}
                    onChange={handleChange('empresa')}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="correo@empresa.com"
                    value={form.email}
                    onChange={handleChange('email')}
                    required
                  />
                  <InputField
                    label="Teléfono"
                    id="telefono"
                    type="tel"
                    placeholder="+57 300 000 0000"
                    value={form.telefono}
                    onChange={handleChange('telefono')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-sm font-medium text-grafito dark:text-white mb-1.5 font-sora"
                  >
                    Mensaje <span className="text-azulStack">*</span>
                  </label>
                  <textarea
                    id="mensaje"
                    rows={5}
                    placeholder="Cuéntanos sobre tu empresa y lo que necesitas..."
                    value={form.mensaje}
                    onChange={handleChange('mensaje')}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-grafito font-sora text-sm placeholder-gray-400 outline-none focus:border-azulStack focus:ring-2 focus:ring-azulStack/20 transition-all duration-200 resize-none dark:bg-[#0C0E15] dark:border-white/10 dark:text-white dark:placeholder-white/30"
                  />
                </div>

                <div className="flex justify-center">
                  <LiquidMetalButton
                    type="submit"
                    label={loading ? 'Enviando...' : 'Enviar mensaje'}
                    disabled={loading}
                    width={200}
                  />
                </div>

                {error && (
                  <p role="alert" className="text-xs text-red-500 text-center font-sora">{error}</p>
                )}
                <p className="text-xs text-acero text-center font-sora">
                  Al enviar este formulario, aceptas que nos pongamos en contacto contigo.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
