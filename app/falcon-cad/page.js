'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';

// ─── Stats ─────────────────────────────────────────────────────────────────
const stats = [
  { value: 'Multi-tenant', label: 'Un sistema, N municipios' },
  { value: '99.9%', label: 'Uptime Oracle Cloud' },
  { value: 'On-premise', label: 'Respaldo local incluido' },
  { value: 'Tiempo real', label: 'Despacho y seguimiento' },
];

// ─── Canales de recepción ───────────────────────────────────────────────────
const channels = [
  { icon: '📞', label: 'Línea 123', desc: 'Integración directa con la planta telefónica (PBX) del municipio. Screen-pop automático al timbrar.' },
  { icon: '💬', label: 'WhatsApp', desc: 'El ciudadano reporta por WhatsApp y el sistema crea el caso automáticamente con conversación adjunta.' },
  { icon: '🔗', label: 'API externa', desc: 'Alarmas monitoreadas, apps municipales y otras centrales pueden radicar casos por API REST con su propia credencial.' },
  { icon: '📹', label: 'Videollamada', desc: 'Streaming de video con el ciudadano en tiempo real para evaluar la emergencia antes del despacho.' },
  { icon: '📍', label: 'Ubicación ELS', desc: 'Google Emergency Location Service — el celular del ciudadano comparte su ubicación GPS precisa al llamar.' },
  { icon: '🌐', label: 'App o web externa', desc: 'Cualquier aplicación web o móvil puede reportar emergencias al sistema mediante la API de integración.' },
];

// ─── Capacidades operativas ─────────────────────────────────────────────────
const capabilities = [
  {
    icon: '🚨',
    title: 'Recepción multicanal unificada',
    desc: 'Todos los reportes —llamada, WhatsApp, API, app— llegan a una sola bandeja operativa. El operador tiene el contexto completo del caso desde el primer segundo.',
  },
  {
    icon: '🚒',
    title: 'Despacho de unidades en tiempo real',
    desc: 'Asigna recursos disponibles (bomberos, policía, ambulancias) al caso. Cada unidad tiene su ciclo: asignada → en ruta → en sitio → finalizada. Sincronizado con la bitácora.',
  },
  {
    icon: '🏛️',
    title: 'Multi-agencia',
    desc: 'Despacha y coordina simultáneamente con todas las entidades: bomberos, Policía Nacional, Cruz Roja, Defensa Civil, SAMU y cualquier agencia registrada.',
  },
  {
    icon: '📋',
    title: 'Bitácora inmutable de auditoría',
    desc: 'Cada acción queda registrada con autor, fecha y hora. Línea de tiempo inmutable: desde la recepción hasta el cierre. Trazabilidad total para informes y control de calidad.',
  },
  {
    icon: '🔐',
    title: 'RBAC dinámico por tenant',
    desc: 'Cada municipio define sus propios roles y permisos. Superadmin global, admin de tenant, supervisor, operador. Permisos granulares configurables desde la matriz de administración.',
  },
  {
    icon: '📊',
    title: 'Panel de métricas y gestión',
    desc: 'Casos por estado, canal y agencia. Tiempos de respuesta, volumen por franja horaria, rendimiento por operador. Datos para mejorar la atención continuamente.',
  },
];

// ─── Beneficios para el ciudadano ───────────────────────────────────────────
const citizenBenefits = [
  { icon: '📱', title: 'Reporta como quieras', desc: 'Llama al 123, escribe por WhatsApp o usa cualquier app municipal. El sistema recibe tu reporte por el canal que más te convenga.' },
  { icon: '⚡', title: 'Respuesta más rápida', desc: 'El operador ve el caso al instante con tu ubicación exacta (Google ELS). Menos tiempo describiendo dónde estás, más tiempo actuando.' },
  { icon: '📍', title: 'Tu ubicación automática', desc: 'Si reportas desde el celular, FALCON CAD obtiene tu GPS preciso en segundos. La entidad llega directamente sin tener que guiarlos.' },
  { icon: '🤝', title: 'Coordinación entre entidades', desc: 'Bomberos, policía y ambulancia actúan coordinados desde el mismo sistema. Sin llamadas cruzadas, sin información perdida.' },
  { icon: '🎥', title: 'Videollamada en emergencias', desc: 'En situaciones críticas el operador puede ver la escena en tiempo real para evaluar y priorizar el despacho correctamente.' },
  { icon: '✅', title: 'Seguimiento hasta el cierre', desc: 'Cada caso tiene un ciclo completo de atención. La entidad no lo abandona hasta que esté resuelto y documentado en bitácora.' },
];

// ─── Módulos del sistema ─────────────────────────────────────────────────────
const modules = [
  { name: 'Recepción', icon: '📥', items: ['Bandeja multicanal unificada', 'Crear caso manual', 'Cambiar estado del caso', 'Derivar a otra agencia', 'Conversación WhatsApp integrada'] },
  { name: 'Despacho (CAD)', icon: '🚑', items: ['Flota de recursos/unidades', 'Disponibilidad en tiempo real', 'Asignación al caso', 'Ciclo asignado → finalizado', 'Sincronización automática'] },
  { name: 'Administración', icon: '⚙️', items: ['Gestión de tenants', 'Usuarios y extensiones PBX', 'Roles y matriz de permisos', 'API keys de entidades externas', 'Configuración WhatsApp / PBX'] },
  { name: 'Auditoría', icon: '📋', items: ['Bitácora inmutable por caso', 'Línea de tiempo con autor', 'Creación, cambios, derivaciones', 'Notas con fecha y hora', 'Exportación para informes'] },
  { name: 'Integraciones', icon: '🔗', items: ['Webhook PBX con API key', 'WhatsApp Cloud API (Meta)', 'API REST para entidades externas', 'Videollamada / Streaming', 'Google ELS (ubicación)'] },
  { name: 'Métricas', icon: '📊', items: ['Casos por estado y canal', 'Volumen por agencia', 'Tiempos de respuesta', 'Rendimiento por operador', 'Exportación de reportes'] },
];

// ─── Infraestructura ─────────────────────────────────────────────────────────
const infra = [
  { icon: '☁️', title: 'Nube Oracle Cloud', desc: 'Región principal en Bogotá, Colombia. Infraestructura enterprise con SLA 99.9%, certificada y diseñada para datos públicos críticos.' },
  { icon: '🖥️', title: 'Respaldo On-Premise', desc: 'Cada municipio puede tener su instancia de respaldo local. Operación garantizada incluso sin conectividad a internet.' },
  { icon: '🏢', title: 'Multi-tenant aislado', desc: 'Todos los municipios en un solo sistema. Datos completamente aislados por `tenant`. Una sola actualización mejora todos los municipios a la vez.' },
  { icon: '🔒', title: 'Seguridad enterprise', desc: 'JWT firmados, RBAC granular, TLS terminado en el balanceador, API keys por entidad, logs de auditoría inmutables.' },
  { icon: '📈', title: 'Escalable sin límites', desc: 'Backend sin estado propio. Corre en N réplicas detrás de un balanceador. Crece con la demanda sin cambiar la arquitectura.' },
  { icon: '🛠️', title: 'SaaS llave en mano', desc: 'Tech Stack Colombia opera la plataforma. El municipio paga el servicio y opera desde el primer día. Sin servidores propios que mantener.' },
];

// ─── Modelo de negocio ────────────────────────────────────────────────────────
const saasModel = [
  { step: '01', title: 'La entidad territorial contrata', desc: 'El municipio o departamento adquiere FALCON CAD como servicio SaaS. Tech Stack Colombia implementa y opera la plataforma.' },
  { step: '02', title: 'Configuración del tenant', desc: 'Se crea el tenant del municipio con sus agencias, operadores, roles y catálogo operativo. Listo para operar en horas, no en semanas.' },
  { step: '03', title: 'Integración con la infraestructura local', desc: 'Se conecta la planta telefónica (PBX), se configura WhatsApp Business y se vinculan las entidades externas que radicarán casos.' },
  { step: '04', title: 'Capacitación y arranque', desc: 'Formación a operadores, supervisores y administradores. El equipo de Tech Stack Colombia acompaña el arranque en producción.' },
  { step: '05', title: 'Operación continua + soporte', desc: 'Tech Stack Colombia mantiene la infraestructura, aplica mejoras y ofrece soporte técnico. El municipio se enfoca en atender emergencias.' },
];

// ─── Componente DeepFeature ───────────────────────────────────────────────────
function ExpandableFeature({ feature, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-[#13161F] border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden hover:border-gray-200 dark:hover:border-white/20 transition-all duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left group"
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl">{feature.icon}</span>
          <span className="font-sora font-semibold text-grafito dark:text-white text-base leading-snug">{feature.title}</span>
        </div>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          className="text-acero flex-shrink-0"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 flex flex-col gap-3 border-t border-gray-100 dark:border-white/10 pt-4">
              {feature.body.map((paragraph, i) => (
                <p key={i} className="font-sora text-sm text-acero leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-grafito dark:text-white font-semibold">$1</strong>'),
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const deepFeatures = [
  {
    icon: '📞',
    title: 'Integración PBX con screen-pop: la llamada crea el caso sola',
    body: [
      'La planta telefónica del municipio envía un webhook a FALCON CAD al instante en que suena una llamada al 123. El operador ve en su pantalla quién llama, desde qué número y en qué estado está el timbrado — antes de levantar el teléfono.',
      '**Screen-pop automático:** si el ciudadano llamó antes, el sistema muestra su historial de casos. Si es primera vez, el operador abre el caso con un solo clic y el número queda vinculado.',
      'Con ACD (distribución automática de llamadas) configurado en la central, la llamada se dirige al operador asignado según su extensión. Solo esa sesión recibe el aviso — igual que en un teléfono de escritorio real.',
    ],
  },
  {
    icon: '💬',
    title: 'WhatsApp como canal oficial de emergencias',
    body: [
      'El ciudadano escribe al número de WhatsApp Business del municipio. FALCON CAD recibe el mensaje, crea el caso automáticamente con canal `whatsapp` y toda la conversación queda adjunta al expediente.',
      'El operador responde desde el detalle del caso — el mensaje sale por la API de Meta directamente al ciudadano. No hay que salir del sistema, no hay que abrir WhatsApp Web.',
      'Cada municipio configura su propio número, token de Meta y verify token desde el módulo de Administración. Un tenant no interfiere con otro.',
    ],
  },
  {
    icon: '📹',
    title: 'Videollamada y streaming con el ciudadano',
    body: [
      'En emergencias donde ver la escena cambia la decisión de despacho — un incendio, un accidente, una persona en peligro — el operador puede iniciar una videollamada con el ciudadano directamente desde FALCON CAD.',
      'El streaming permite evaluar la magnitud real de la emergencia antes de definir cuántas unidades y de qué tipo despachar. Menos despachos innecesarios, más recursos disponibles para la siguiente emergencia.',
    ],
  },
  {
    icon: '📍',
    title: 'Google ELS: la ubicación exacta del ciudadano en segundos',
    body: [
      'Google Emergency Location Service envía automáticamente la ubicación GPS del teléfono del ciudadano cuando llama a una línea de emergencias configurada. FALCON CAD recibe esa ubicación y la vincula al caso.',
      'El operador ve exactamente dónde está el ciudadano en el mapa — sin que tenga que describir una dirección bajo estrés, sin errores de comunicación, sin pérdida de tiempo.',
      'En zonas rurales o donde el ciudadano no conoce la dirección exacta, esta tecnología puede ser la diferencia entre llegar a tiempo o no.',
    ],
  },
  {
    icon: '🔗',
    title: 'API abierta: cualquier app puede reportar emergencias',
    body: [
      'Centrales de alarmas monitoreadas, aplicaciones municipales, otras agencias o sistemas externos se registran como entidades en FALCON CAD y reciben una API key propia.',
      'Con esa key, la entidad puede radicar casos via REST (`POST /api/integracion/casos`) y consultar el estado de sus propios casos. Nunca accede a casos de otras entidades — aislamiento garantizado.',
      '**Esto abre FALCON CAD a todo el ecosistema digital del municipio:** apps móviles ciudadanas, botones de pánico, sensores IoT, cámaras con detección de eventos — cualquier fuente que pueda hacer una llamada HTTP.',
    ],
  },
  {
    icon: '🏛️',
    title: 'Coordinación multi-agencia: todas las entidades en una operación',
    body: [
      'Una emergencia real involucra varias entidades simultáneamente. FALCON CAD permite derivar el caso a Bomberos, Policía, Cruz Roja y SAMU en paralelo, y hacer seguimiento de cada agencia desde el mismo expediente.',
      'Cada agencia ve solo lo que le corresponde. El supervisor del municipio tiene visibilidad de todo. La bitácora registra cada derivación con quién la hizo y cuándo.',
      'Fin del teléfono roto entre entidades. Todo coordinado desde una sola pantalla.',
    ],
  },
];

// ─── Página ──────────────────────────────────────────────────────────────────
export default function FalconCadPage() {
  return (
    <div className="bg-papel min-h-screen">
      {/* Navbar mínimo */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-grafito/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
              <rect width="100" height="100" rx="22" fill="#2E68E6"/>
              <rect x="20" y="22" width="60" height="14" rx="7" fill="white"/>
              <rect x="20" y="43" width="47" height="14" rx="7" fill="rgba(255,255,255,0.75)"/>
              <rect x="20" y="64" width="34" height="14" rx="7" fill="rgba(255,255,255,0.5)"/>
            </svg>
            <span className="font-sora font-bold text-grafito dark:text-white text-base tracking-tight">Tech Stack Colombia</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#servicios" className="font-sora text-sm text-acero hover:text-grafito dark:hover:text-white transition-colors">Servicios</Link>
            <Link href="/#portafolio" className="font-sora text-sm text-acero hover:text-grafito dark:hover:text-white transition-colors">Portafolio</Link>
            <Link href="/ksmart360" className="font-sora text-sm text-acero hover:text-grafito dark:hover:text-white transition-colors">Ksmart360</Link>
            <Link href="/#contacto" className="font-sora text-sm font-semibold text-white bg-azulStack hover:bg-azul px-4 py-2 rounded-lg transition-colors">Contacto</Link>
          </nav>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-grafito overflow-hidden pt-20 pb-28 lg:pt-28 lg:pb-36">
        {/* Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #2E68E6 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6A6F7E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full mb-6 tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Tech Stack Colombia · Producto propio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-sora font-light text-5xl lg:text-6xl xl:text-7xl text-white leading-tight tracking-tight mb-6"
            >
              FALCON CAD
              <span className="block text-emerald-400 font-extralight text-3xl lg:text-4xl mt-2">Plataforma de Gestión de Emergencias</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="font-sora text-lg text-white/60 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              La plataforma tecnológica nacional para la gestión integral del <strong className="text-white">123</strong>.
              Recibe, clasifica, coordina y hace seguimiento a cada emergencia —
              desde la llamada hasta el cierre — con todas las entidades de respuesta operando en tiempo real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <LiquidMetalButton
                label="Solicitar demostración"
                onClick={() => document.getElementById('contacto-falcon')?.scrollIntoView({ behavior: 'smooth' })}
                width={240}
              />
              <Link
                href="/#contacto"
                className="font-sora text-sm font-medium text-white/60 hover:text-white transition-colors border border-white/20 hover:border-white/40 px-6 py-3 rounded-xl"
              >
                Hablar con un experto →
              </Link>
            </motion.div>
          </div>

          {/* Screenshot hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-400" />
              <Image
                src="/screenshots/LoginFalcon.png"
                alt="FALCON CAD — Pantalla de inicio de sesión"
                width={1200}
                height={700}
                className="w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-grafito/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0D0F16] border-y border-gray-100 dark:border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-sora font-light text-2xl lg:text-3xl text-grafito dark:text-white">{s.value}</p>
                <p className="font-sora text-xs text-acero mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROPÓSITO: EL CIUDADANO ────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-papel">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 border border-emerald-200 dark:border-emerald-400/20 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              El beneficio real
            </span>
            <h2 className="font-sora font-light text-4xl lg:text-5xl xl:text-6xl text-grafito dark:text-white leading-tight tracking-tight">
              La tecnología al servicio<br />de quien más la necesita
            </h2>
            <p className="mt-4 font-sora text-base text-acero max-w-2xl mx-auto leading-relaxed">
              FALCON CAD la opera la entidad territorial. Pero la beneficiada real es la ciudadanía.
              Una operación de emergencias bien gestionada salva vidas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {citizenBenefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-[#13161F] border border-gray-100 dark:border-white/10 rounded-2xl p-7 hover:border-emerald-200 dark:hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-50 dark:hover:shadow-emerald-500/5 transition-all duration-300"
              >
                <span className="text-3xl mb-4 block">{b.icon}</span>
                <h3 className="font-sora font-semibold text-grafito dark:text-white text-base mb-2">{b.title}</h3>
                <p className="font-sora text-sm text-acero leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CANALES DE RECEPCIÓN ───────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-grafito relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6A6F7E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-8 pointer-events-none" style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-mono font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Canales de recepción
            </span>
            <h2 className="font-sora font-light text-4xl lg:text-5xl text-white leading-tight tracking-tight">
              El ciudadano reporta como quiera
            </h2>
            <p className="mt-4 font-sora text-white/50 max-w-xl mx-auto">
              FALCON CAD es flexible. Recibe emergencias por cualquier canal digital y las unifica en una sola bandeja operativa.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {channels.map((ch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-emerald-500/30 hover:bg-white/8 transition-all duration-300"
              >
                <span className="text-3xl mb-4 block">{ch.icon}</span>
                <h3 className="font-sora font-semibold text-white text-base mb-2">{ch.label}</h3>
                <p className="font-sora text-sm text-white/55 leading-relaxed">{ch.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPACIDADES OPERATIVAS ─────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-papel">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte border border-azulStack/20 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Capacidades
            </span>
            <h2 className="font-sora font-light text-4xl lg:text-5xl xl:text-6xl text-grafito dark:text-white leading-tight tracking-tight">
              Todo lo que necesita<br />una central de emergencias
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-[#13161F] border border-gray-100 dark:border-white/10 rounded-2xl p-7 hover:border-azulStack/30 hover:shadow-xl transition-all duration-300"
              >
                <span className="text-3xl mb-4 block">{c.icon}</span>
                <h3 className="font-sora font-semibold text-grafito dark:text-white text-base mb-3">{c.title}</h3>
                <p className="font-sora text-sm text-acero leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÓDULOS ───────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-grafito relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6A6F7E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-mono font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Módulos del sistema
            </span>
            <h2 className="font-sora font-light text-4xl lg:text-5xl text-white leading-tight tracking-tight">
              Una plataforma completa
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{mod.icon}</span>
                  <h3 className="font-sora font-semibold text-white text-base">{mod.name}</h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {mod.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-emerald-500/20">
                        <svg width="8" height="8" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                      <span className="font-sora text-xs text-white/65 leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUNCIONALIDADES EN DETALLE ─────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-papel">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte border border-azulStack/20 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Detalles técnicos
            </span>
            <h2 className="font-sora font-light text-4xl lg:text-5xl text-grafito dark:text-white leading-tight tracking-tight">
              Cómo funciona cada pieza
            </h2>
          </motion.div>

          <div className="flex flex-col gap-3">
            {deepFeatures.map((f, i) => (
              <ExpandableFeature key={i} feature={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── INFRAESTRUCTURA ───────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-grafito relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6A6F7E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #2E68E6 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-mono font-medium text-azul bg-azul/15 border border-azul/20 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Infraestructura
            </span>
            <h2 className="font-sora font-light text-4xl lg:text-5xl text-white leading-tight tracking-tight">
              Diseñada para datos públicos críticos
            </h2>
            <p className="mt-4 font-sora text-white/50 max-w-xl mx-auto">
              Oracle Cloud región Bogotá como principal, respaldo on-premise en el municipio.
              Datos soberanos, infraestructura colombiana.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {infra.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-azul/30 transition-all duration-300"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="font-sora font-semibold text-white text-base mb-2">{item.title}</h3>
                <p className="font-sora text-sm text-white/55 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODELO SAAS ───────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-papel">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte border border-azulStack/20 px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Modelo SaaS
            </span>
            <h2 className="font-sora font-light text-4xl lg:text-5xl xl:text-6xl text-grafito dark:text-white leading-tight tracking-tight">
              Del contrato a la operación<br className="hidden lg:block" /> en días
            </h2>
            <p className="mt-4 font-sora text-base text-acero max-w-2xl mx-auto leading-relaxed">
              La entidad territorial contrata el servicio. Tech Stack Colombia opera la plataforma.
              Sin infraestructura propia que mantener.
            </p>
          </motion.div>

          <div className="relative">
            {/* Línea conectora */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

            <div className="grid lg:grid-cols-5 gap-6">
              {saasModel.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="relative bg-white dark:bg-[#13161F] border border-gray-100 dark:border-white/10 rounded-2xl p-6 text-center"
                >
                  <div className="w-8 h-8 rounded-full bg-azulStack text-white font-mono text-xs font-bold flex items-center justify-center mx-auto mb-4 relative z-10">
                    {step.step}
                  </div>
                  <h3 className="font-sora font-semibold text-grafito dark:text-white text-sm mb-2 leading-snug">{step.title}</h3>
                  <p className="font-sora text-xs text-acero leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────────── */}
      <section id="contacto-falcon" className="py-24 lg:py-32 bg-grafito relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #6A6F7E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-8 pointer-events-none" style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }} />

        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full mb-6 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Disponible ahora · SaaS para entidades territoriales
            </span>

            <h2 className="font-sora font-light text-4xl lg:text-5xl text-white leading-tight tracking-tight mb-6">
              ¿Tu municipio necesita<br />una central de emergencias moderna?
            </h2>
            <p className="font-sora text-white/55 text-lg leading-relaxed mb-10">
              Hablemos. Te mostramos FALCON CAD en funcionamiento real,
              respondemos tus preguntas técnicas y te presentamos el modelo de contratación.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <LiquidMetalButton
                label="Solicitar demostración"
                onClick={() => window.location.href = '/#contacto'}
                width={240}
              />
              <a
                href="https://wa.me/573000000000?text=Hola%2C%20quiero%20información%20sobre%20FALCON%20CAD"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sora text-sm font-medium text-white/60 hover:text-white transition-colors border border-white/20 hover:border-white/40 px-6 py-3 rounded-xl"
              >
                Escribir por WhatsApp →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
