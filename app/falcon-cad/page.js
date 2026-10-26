'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence, animate } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, Smartphone, Zap, MapPin, Users, Video, CircleCheck, Inbox, Truck, Building2, ScrollText,
  KeyRound, BarChart3, Settings, Webhook, Cloud, Server, Layers, Lock, TrendingUp, Wrench, Phone, MessageCircle,
  ChevronDown, Headset, Radio, ClipboardList, Navigation, ShieldCheck,
} from 'lucide-react';
import Footer from '@/components/Footer';
import CadConsole from '@/components/falcon/CadConsole';
import ChannelHub from '@/components/falcon/ChannelHub';
import AgencyMarquee from '@/components/falcon/AgencyMarquee';

const EASE = [0.22, 1, 0.36, 1];
const WA = 'https://wa.me/573132354086?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20FALCON%20CAD';

// ─── Data ────────────────────────────────────────────────────────────────────
const stats = [
  { value: 6, suffix: '+', label: 'Canales de recepción' },
  { value: 99.9, suffix: '%', decimals: 1, label: 'Disponibilidad Oracle Cloud' },
  { value: 24, suffix: '/7', label: 'Operación continua' },
  { value: 1, suffix: '', label: 'Sistema para todas las agencias' },
];

const citizenBenefits = [
  { icon: Smartphone, title: 'Reporta como quieras', desc: 'Llama al 123, escribe por WhatsApp o usa cualquier app conectada. El sistema recibe tu reporte por el canal que más te convenga.' },
  { icon: Zap, title: 'Respuesta más rápida', desc: 'El operador ve el caso al instante con tu ubicación exacta. Menos tiempo describiendo dónde estás, más tiempo actuando.' },
  { icon: Users, title: 'Agencias coordinadas', desc: 'Bomberos, Policía y Salud actúan coordinados desde el mismo sistema. Sin llamadas cruzadas, sin información perdida.' },
  { icon: Video, title: 'Videollamada en emergencias', desc: 'En situaciones críticas el operador ve la escena en tiempo real para evaluar y priorizar el despacho correctamente.' },
  { icon: CircleCheck, title: 'Seguimiento hasta el cierre', desc: 'Cada caso tiene un ciclo completo de atención y no se abandona hasta que esté resuelto y documentado.' },
];

const lifecycle = [
  { t: '00:00', icon: Phone, title: 'Recepción', desc: 'Llega por 123, WhatsApp, video o API. Screen-pop y ubicación ELS automáticos.' },
  { t: '00:20', icon: ClipboardList, title: 'Clasificación', desc: 'El operador tipifica el incidente y asigna prioridad con el catálogo operativo.' },
  { t: '00:45', icon: Radio, title: 'Despacho', desc: 'Se derivan las agencias necesarias y se asignan unidades disponibles.' },
  { t: '08:30', icon: Navigation, title: 'Atención en sitio', desc: 'Las unidades reportan en ruta y en sitio. Todo queda sincronizado.' },
  { t: 'Cierre', icon: ScrollText, title: 'Cierre y bitácora', desc: 'Caso cerrado con trazabilidad completa: quién, qué y cuándo.' },
];

const capabilities = [
  { icon: Inbox, title: 'Recepción multicanal unificada', desc: 'Llamada, WhatsApp, API y apps llegan a una sola bandeja operativa. El operador tiene el contexto completo desde el primer segundo.', wide: true, visual: 'channels' },
  { icon: Truck, title: 'Despacho en tiempo real', desc: 'Cada unidad tiene su ciclo: asignada → en ruta → en sitio → finalizada. Sincronizado con la bitácora.' },
  { icon: Building2, title: 'Coordinación multi-agencia', desc: 'Policía Nacional, Bomberos, Defensa Civil, Ejército, Salud, Comisarías y cualquier agencia registrada en paralelo.' },
  { icon: ScrollText, title: 'Bitácora inmutable de auditoría', desc: 'Cada acción queda registrada con autor, fecha y hora. Trazabilidad total para informes y control de calidad.', wide: true, visual: 'log' },
  { icon: BarChart3, title: 'Panel de métricas y gestión', desc: 'Casos por estado, canal y agencia. Tiempos de respuesta y rendimiento por operador para mejorar continuamente.', wide: true, visual: 'bars' },
  { icon: KeyRound, title: 'Roles y permisos dinámicos', desc: 'Cada central define sus roles: superadmin, admin, supervisor, operador. Permisos granulares desde una matriz.' },
];

const modules = [
  { name: 'Recepción', icon: Inbox, items: ['Bandeja multicanal unificada', 'Crear caso manual', 'Cambiar estado del caso', 'Derivar a otra agencia', 'Conversación WhatsApp integrada'] },
  { name: 'Despacho', icon: Truck, items: ['Flota de recursos y unidades', 'Disponibilidad en tiempo real', 'Asignación al caso', 'Ciclo asignado → finalizado', 'Sincronización automática'] },
  { name: 'Administración', icon: Settings, items: ['Gestión de centrales', 'Usuarios y extensiones PBX', 'Roles y matriz de permisos', 'API keys de entidades externas', 'Configuración WhatsApp / PBX'] },
  { name: 'Auditoría', icon: ScrollText, items: ['Bitácora inmutable por caso', 'Línea de tiempo con autor', 'Creación, cambios, derivaciones', 'Notas con fecha y hora', 'Exportación para informes'] },
  { name: 'Integraciones', icon: Webhook, items: ['Webhook PBX con API key', 'WhatsApp Cloud API (Meta)', 'API REST para entidades externas', 'Videollamada / streaming', 'Google ELS (ubicación)'] },
  { name: 'Métricas', icon: BarChart3, items: ['Casos por estado y canal', 'Volumen por agencia', 'Tiempos de respuesta', 'Rendimiento por operador', 'Exportación de reportes'] },
];

const deepFeatures = [
  {
    icon: Phone,
    title: 'Integración PBX con screen-pop: la llamada crea el caso sola',
    body: [
      'La planta telefónica de la central envía un webhook a FALCON CAD en el instante en que suena una llamada al 123. El operador ve quién llama, desde qué número y el estado del timbrado — antes de levantar el teléfono.',
      '**Screen-pop automático:** si el ciudadano llamó antes, el sistema muestra su historial de casos. Si es la primera vez, el operador abre el caso con un clic y el número queda vinculado.',
      'Con ACD configurado en la central, la llamada se dirige al operador asignado según su extensión. Solo esa sesión recibe el aviso, igual que un teléfono de escritorio.',
    ],
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp como canal oficial de emergencias',
    body: [
      'El ciudadano escribe al número de WhatsApp Business de la central. FALCON CAD crea el caso automáticamente y toda la conversación queda adjunta al expediente.',
      'El operador responde desde el detalle del caso: el mensaje sale por la API de Meta directamente al ciudadano, sin salir del sistema.',
      'Cada central configura su propio número y credenciales desde Administración. Una central no interfiere con otra.',
    ],
  },
  {
    icon: Video,
    title: 'Videollamada y streaming con el ciudadano',
    body: [
      'En emergencias donde ver la escena cambia la decisión — un incendio, un accidente, una persona en peligro — el operador inicia una videollamada con el ciudadano desde FALCON CAD.',
      'El streaming permite evaluar la magnitud real antes de definir cuántas unidades y de qué tipo despachar. Menos despachos innecesarios, más recursos disponibles.',
    ],
  },
  {
    icon: MapPin,
    title: 'Google ELS: la ubicación exacta del ciudadano en segundos',
    body: [
      'Google Emergency Location Service envía automáticamente la ubicación GPS del teléfono cuando el ciudadano llama a una línea de emergencias. FALCON CAD la vincula al caso.',
      'El operador ve exactamente dónde está el ciudadano en el mapa — sin que tenga que describir una dirección bajo estrés.',
      '**En zonas rurales** o cuando el ciudadano no conoce la dirección, esta tecnología puede ser la diferencia entre llegar a tiempo o no.',
    ],
  },
  {
    icon: Webhook,
    title: 'API abierta: cualquier app puede reportar emergencias',
    body: [
      'Centrales de alarmas, aplicaciones ciudadanas, otras agencias o sistemas externos se registran como entidades y reciben una API key propia.',
      'Con esa key radican casos vía REST y consultan el estado de sus propios casos. Nunca acceden a casos de otras entidades.',
      '**Botones de pánico, sensores IoT, cámaras con detección de eventos:** cualquier fuente que pueda hacer una llamada HTTP puede alimentar la central.',
    ],
  },
  {
    icon: Building2,
    title: 'Coordinación multi-agencia: todas las entidades en una operación',
    body: [
      'Una emergencia real involucra varias entidades a la vez. FALCON CAD deriva el caso a Bomberos, Policía, Salud y Defensa Civil en paralelo, con seguimiento desde el mismo expediente.',
      'Cada agencia ve lo que le corresponde. El supervisor de la central tiene visibilidad de todo. La bitácora registra cada derivación.',
      '**Fin del teléfono roto entre entidades.** Todo coordinado desde una sola pantalla.',
    ],
  },
];

const infra = [
  { icon: Layers, title: 'Multi-tenant aislado', desc: 'Datos completamente aislados por central. Una actualización mejora a todas a la vez.' },
  { icon: Lock, title: 'Seguridad enterprise', desc: 'JWT firmados, RBAC granular, TLS, API keys por entidad y logs inmutables.' },
  { icon: TrendingUp, title: 'Escalable sin límites', desc: 'Backend sin estado en N réplicas detrás de un balanceador. Crece con la demanda.' },
  { icon: Wrench, title: 'Operado por Tech Stack Colombia', desc: 'Nosotros mantenemos la infraestructura. Las agencias se enfocan en atender emergencias.' },
];

const steps = [
  { title: 'Implementación', desc: 'Configuramos FALCON CAD para la central: agencias, operadores, roles, catálogo operativo y canales.' },
  { title: 'Integración local', desc: 'Conectamos la planta telefónica, WhatsApp Business y las entidades externas que radicarán casos.' },
  { title: 'Capacitación', desc: 'Formación a operadores, supervisores y administradores de cada agencia, con acompañamiento en el arranque.' },
  { title: 'Operación', desc: 'Policía Nacional, Bomberos, Defensa Civil, Ejército, Salud, Comisarías y demás agencias operan coordinadas.' },
  { title: 'Soporte continuo', desc: 'Mantenemos la infraestructura y aplicamos mejoras. Las agencias se dedican a lo que importa.' },
];

// ─── Shared bits ─────────────────────────────────────────────────────────────
function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-falcon-cyan">
      <span className="w-6 h-px bg-falcon-cyan" />
      {children}
    </span>
  );
}

function Reveal({ children, delay = 0, className = '', y = 28 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ value, suffix, decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.6, ease: EASE, onUpdate: setV });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref} className="tabular-nums">{v.toFixed(decimals)}{suffix}</span>;
}

function ScrollWords({ text, highlight = [] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className="font-display font-semibold text-3xl sm:text-5xl lg:text-6xl leading-[1.08] text-white flex flex-wrap gap-x-[0.25em]">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} hl={highlight.includes(i)}>{w}</Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range, hl }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return <motion.span style={{ opacity }} className={hl ? 'text-gradient-falcon' : ''}>{children}</motion.span>;
}

function CapVisual({ kind }) {
  if (kind === 'channels') {
    return (
      <div className="flex gap-2 mt-6">
        {[Phone, MessageCircle, Video, MapPin, Webhook, Smartphone].map((I, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.4, delay: i * 0.18, repeat: Infinity }}
            className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center"
          >
            <I size={16} className="text-falcon-cyan" />
          </motion.span>
        ))}
      </div>
    );
  }
  if (kind === 'log') {
    return (
      <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-3 font-mono text-[11px] leading-6 text-white/55">
        <p><span className="text-white/30">14:02:07</span> · <span className="text-falcon-cyan">OP-04</span> creó caso #24817 · Línea 123</p>
        <p><span className="text-white/30">14:02:31</span> · <span className="text-falcon-cyan">OP-04</span> derivó a Bomberos, Salud</p>
        <p><span className="text-white/30">14:09:52</span> · <span className="text-amber-300">B-12</span> reportó «En sitio»</p>
      </div>
    );
  }
  return (
    <div className="mt-6 flex items-end gap-1.5 h-20">
      {[35, 60, 45, 80, 52, 92, 66, 74, 48, 88, 58, 70, 40, 84].map((h, i) => (
        <motion.span
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.04, ease: EASE }}
          className="flex-1 rounded-t bg-gradient-to-t from-falcon-cyan/20 to-falcon-cyan"
        />
      ))}
    </div>
  );
}

function DeepFeature({ f, i, open, onToggle }) {
  const Icon = f.icon;
  return (
    <Reveal delay={i * 0.05}>
      <div className={`rounded-2xl border transition-colors duration-300 ${open ? 'border-falcon-cyan/40 bg-white/[0.04]' : 'border-white/10 bg-white/[0.02] hover:border-white/20'}`}>
        <button onClick={onToggle} className="w-full flex items-center gap-4 sm:gap-5 p-5 sm:p-6 text-left">
          <span className="font-mono text-xs text-white/30 w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
          <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${open ? 'bg-falcon-cyan text-falcon-ink' : 'bg-white/[0.06] text-falcon-cyan'}`}>
            <Icon size={18} />
          </span>
          <span className="font-display font-semibold text-white text-base sm:text-lg leading-snug flex-1">{f.title}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-white/40 shrink-0">
            <ChevronDown size={18} />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-6 sm:pl-[6.5rem] flex flex-col gap-3">
                {f.body.map((p, k) => (
                  <p
                    key={k}
                    className="font-sora text-sm text-white/60 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function FalconCadPage() {
  const consoleRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: consoleRef, offset: ['start end', 'start 0.25'] });
  const tilt = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  const lifeRef = useRef(null);
  const lifeInView = useInView(lifeRef, { once: true, amount: 0.4 });

  const [mod, setMod] = useState(0);
  const [openFeature, setOpenFeature] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const ActiveMod = modules[mod];

  return (
    <div className="bg-falcon-ink text-white min-h-screen overflow-x-clip">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-falcon-ink/75 backdrop-blur-xl border-b border-white/10' : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/falcon-cad" className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-[0_0_24px_rgba(34,211,238,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/falcon/falcon-mark.png" alt="" className="w-6 h-6 object-contain" />
            </span>
            <span className="leading-none">
              <span className="block font-display font-bold text-[15px] tracking-wide">FALCON <span className="text-falcon-cyan">CAD</span></span>
              <span className="block font-mono text-[9px] text-white/40 tracking-widest uppercase mt-1">by Tech Stack Colombia</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {[['ciudadania', 'Ciudadanía'], ['canales', 'Canales'], ['agencias', 'Agencias'], ['plataforma', 'Plataforma'], ['infraestructura', 'Infraestructura']].map(([id, label]) => (
              <button key={id} onClick={() => go(id)} className="font-sora text-sm text-white/60 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 font-sora text-sm text-white/50 hover:text-white px-3 py-2 transition-colors">
              <ArrowLeft size={14} /> Tech Stack
            </Link>
            <button
              onClick={() => go('contacto-falcon')}
              className="font-sora text-sm font-semibold text-falcon-ink bg-gradient-to-r from-falcon-cyan to-falcon-sky hover:brightness-110 px-4 py-2 rounded-xl transition shadow-[0_0_24px_rgba(34,211,238,0.35)]"
            >
              Solicitar demo
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative pt-36 lg:pt-44 pb-24 overflow-hidden">
        {/* Aurora */}
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 left-[8%] w-[620px] h-[620px] rounded-full blur-[120px] opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 65%)' }}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 right-[4%] w-[560px] h-[560px] rounded-full blur-[120px] opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #1D4ED8 0%, transparent 65%)' }}
        />
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px] opacity-25 pointer-events-none" style={{ background: 'radial-gradient(circle, #14B8A6 0%, transparent 65%)' }} />
        {/* Spotlight beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] pointer-events-none opacity-60" style={{ background: 'conic-gradient(from 180deg at 50% 0%, transparent 160deg, rgba(34,211,238,0.12) 180deg, transparent 200deg)' }} />
        {/* Radar rings */}
        <div className="absolute top-[200px] left-1/2 -translate-x-1/2 pointer-events-none">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-falcon-cyan/10"
              style={{ width: 360 + i * 260, height: 360 + i * 260 }}
            />
          ))}
        </div>
        {/* Perspective floor grid */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] pointer-events-none [perspective:700px]">
          <div
            className="absolute inset-x-[-50%] bottom-0 h-full origin-bottom [transform:rotateX(62deg)]"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(34,211,238,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.14) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage: 'linear-gradient(to top, #000 0%, transparent 85%)',
              WebkitMaskImage: 'linear-gradient(to top, #000 0%, transparent 85%)',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur pl-1.5 pr-4 py-1.5">
                <span className="flex shrink-0 whitespace-nowrap items-center gap-1.5 rounded-full bg-rose-500/15 text-rose-300 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-rose-400 animate-ping" />
                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-rose-400" />
                  </span>
                  En vivo
                </span>
                <span className="font-sora text-xs text-white/70">Sistema de despacho asistido por computador</span>
              </span>
            </motion.div>

            <h1 className="mt-8 font-display font-bold text-[3.4rem] leading-[0.92] sm:text-7xl lg:text-[7.5rem] tracking-[-0.045em]">
              {['Cada', 'segundo'].map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: EASE }}
                  className="inline-block mr-[0.22em]"
                >
                  {w}
                </motion.span>
              ))}
              <br />
              <motion.span
                initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
                className="inline-block text-gradient-falcon pb-2"
              >
                cuenta.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
              className="mt-8 font-sora text-lg sm:text-xl text-white/65 max-w-3xl mx-auto leading-relaxed"
            >
              <strong className="text-white font-semibold">FALCON CAD</strong> es la plataforma colombiana de gestión de emergencias
              que conecta al ciudadano con <span className="text-white">Policía, Bomberos, Defensa Civil, Ejército, Salud</span> y
              todas las agencias de respuesta — desde la llamada al 123 hasta el cierre del caso.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <button
                onClick={() => go('contacto-falcon')}
                className="group inline-flex items-center gap-2 font-sora font-semibold text-falcon-ink bg-gradient-to-r from-falcon-cyan via-falcon-sky to-falcon-cyan bg-[length:200%_100%] hover:bg-right px-7 py-4 rounded-2xl transition-all duration-500 shadow-[0_10px_40px_-6px_rgba(34,211,238,0.6)]"
              >
                Solicitar demostración
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => go('canales')}
                className="inline-flex items-center gap-2 font-sora font-medium text-white/80 hover:text-white border border-white/15 hover:border-white/30 bg-white/[0.03] backdrop-blur px-7 py-4 rounded-2xl transition-colors"
              >
                Ver cómo funciona
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-white/40"
            >
              {['Oracle Cloud · Bogotá', 'Respaldo on-premise', 'Google ELS', 'WhatsApp Cloud API'].map((t) => (
                <span key={t} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-falcon-cyan" />{t}</span>
              ))}
            </motion.div>
          </div>

          {/* Console */}
          <div ref={consoleRef} className="mt-20 [perspective:1600px]">
            <motion.div style={{ rotateX: tilt, scale }} className="relative max-w-6xl mx-auto origin-top">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-falcon-cyan/60 via-falcon-cyan/10 to-transparent pointer-events-none" />
              <CadConsole />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Agencies ───────────────────────────────────────────────────── */}
      <section id="agencias" className="relative py-20 border-y border-white/[0.06] bg-gradient-to-b from-[#07101D] to-falcon-ink">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <Eyebrow>Quién lo opera</Eyebrow>
            <h2 className="mt-4 font-display font-semibold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] max-w-2xl">
              Diseñado para las agencias que <span className="text-gradient-falcon">responden</span>.
            </h2>
          </div>
          <p className="font-sora text-white/55 max-w-md leading-relaxed">
            Policía Nacional, Bomberos, Defensa Civil, Ejército, Secretaría de Salud, Comisarías y demás agencias operan
            coordinadas desde una misma plataforma, cada una con su rol y sus permisos.
          </p>
        </div>
        <AgencyMarquee />
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden border border-white/10 bg-white/10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-falcon-ink p-8 lg:p-10">
              <p className="font-display font-bold text-5xl lg:text-6xl tracking-tight text-gradient-falcon">
                <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="mt-3 font-sora text-sm text-white/50">{s.label}</p>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* ── Ciudadanía ─────────────────────────────────────────────────── */}
      <section id="ciudadania" className="relative py-24 lg:py-32">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 40% at 85% 20%, rgba(34,211,238,0.10), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(29,78,216,0.14), transparent 70%)' }} />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="max-w-5xl">
            <Eyebrow>El beneficio real</Eyebrow>
            <div className="mt-6">
              <ScrollWords
                text="Lo operan las agencias de respuesta. Lo vive la ciudadanía: más canales para pedir ayuda, atención más rápida y una operación de calidad que salva vidas."
                highlight={[9, 24, 25]}
              />
            </div>
          </div>

          <div className="mt-20 grid lg:grid-cols-3 gap-4">
            {/* ELS hero card */}
            <Reveal className="lg:row-span-3">
              <div className="relative h-full min-h-[520px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0B1B2E] to-[#060D18] p-8 flex flex-col">
                <div className="absolute inset-x-0 top-10 flex justify-center pointer-events-none">
                  <div className="relative w-72 h-72">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="absolute inset-0 rounded-full border border-falcon-cyan/30 animate-ping-slow" style={{ animationDelay: `${i * 0.8}s` }} />
                    ))}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="absolute inset-0 animate-radar" style={{ background: 'conic-gradient(from 0deg, rgba(34,211,238,0.35), transparent 25%)' }} />
                    </div>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                      <MapPin size={44} className="text-rose-400 drop-shadow-[0_0_18px_rgba(244,63,94,0.8)]" fill="rgba(244,63,94,0.25)" />
                    </span>
                  </div>
                </div>
                <span className="relative self-start font-mono text-[10px] uppercase tracking-widest text-falcon-cyan bg-falcon-cyan/10 border border-falcon-cyan/20 rounded-full px-3 py-1">Google ELS</span>
                <div className="relative mt-auto">
                  <p className="font-mono text-xs text-white/40 mb-3">4.4389° N · 75.2322° W · ±8 m</p>
                  <h3 className="font-display font-semibold text-3xl leading-tight">Tu ubicación exacta, en segundos.</h3>
                  <p className="mt-3 font-sora text-sm text-white/55 leading-relaxed">
                    Si reportas desde el celular, FALCON CAD recibe tu GPS preciso. La agencia llega directamente, sin que tengas que describir dónde estás.
                  </p>
                </div>
              </div>
            </Reveal>
            {citizenBenefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.title} delay={0.05 + i * 0.06} className={i === 4 ? 'lg:col-span-2' : ''}>
                  <div className="glow-card glow-falcon group h-full rounded-3xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.045] p-7 transition-colors">
                    <span className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-falcon-cyan/25 to-blue-600/10 border border-falcon-cyan/25 group-hover:scale-110 transition-transform">
                      <Icon size={20} className="text-falcon-cyan" />
                    </span>
                    <h3 className="mt-5 font-display font-semibold text-xl">{b.title}</h3>
                    <p className="mt-2 font-sora text-sm text-white/55 leading-relaxed">{b.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Canales ────────────────────────────────────────────────────── */}
      <section id="canales" className="relative py-24 lg:py-32 bg-[#040811] border-y border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 grid-fade opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>Canales de recepción</Eyebrow>
            <h2 className="mt-4 font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
              El ciudadano reporta <span className="text-gradient-falcon">como quiera</span>.
            </h2>
            <p className="mt-5 font-sora text-white/55 text-lg leading-relaxed">
              FALCON CAD es flexible: recibe emergencias por cualquier canal y se integra con cualquier aplicación web o móvil externa.
              Todo llega a una sola bandeja operativa.
            </p>
          </div>
          <ChannelHub />
        </div>
      </section>

      {/* ── Ciclo de un caso ───────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <Eyebrow>El ciclo de un caso</Eyebrow>
              <h2 className="mt-4 font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.02] max-w-2xl">
                De la llamada al cierre, <span className="text-gradient-falcon">sin perder un segundo</span>.
              </h2>
            </div>
            <p className="font-sora text-white/55 max-w-sm leading-relaxed">Cada paso queda sincronizado entre agencias y registrado en la bitácora inmutable.</p>
          </div>

          <div ref={lifeRef} className="relative">
            <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={lifeInView ? { scaleX: 1 } : {}}
                transition={{ duration: 2.4, ease: 'easeInOut' }}
                className="h-full origin-left bg-gradient-to-r from-falcon-cyan via-falcon-sky to-falcon-teal"
              />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
              {lifecycle.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 24 }}
                    animate={lifeInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.45, ease: EASE }}
                    className="relative flex flex-col items-center text-center"
                  >
                    <span className="relative w-14 h-14 rounded-2xl flex items-center justify-center bg-falcon-ink border border-falcon-cyan/50 shadow-[0_0_30px_rgba(34,211,238,0.35)]">
                      <Icon size={22} className="text-falcon-cyan" />
                    </span>
                    <span className="mt-5 font-mono text-xs text-falcon-cyan tabular-nums">{s.t}</span>
                    <h3 className="mt-1 font-display font-semibold text-xl">{s.title}</h3>
                    <p className="mt-2 font-sora text-sm text-white/50 leading-relaxed max-w-[15rem]">{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Capacidades (bento) ────────────────────────────────────────── */}
      <section id="plataforma" className="relative py-24 lg:py-32 bg-gradient-to-b from-falcon-ink via-[#06101E] to-falcon-ink">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>Capacidades</Eyebrow>
            <h2 className="mt-4 font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
              Todo lo que necesita una <span className="text-gradient-falcon">central de emergencias</span>.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 0.06} className={c.wide ? 'lg:col-span-2' : ''}>
                  <div className="glow-card glow-falcon group relative h-full rounded-3xl border border-white/10 bg-white/[0.025] p-8 overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-falcon-cyan/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Icon size={26} className="text-falcon-cyan" strokeWidth={1.6} />
                    <h3 className="mt-5 font-display font-semibold text-2xl">{c.title}</h3>
                    <p className="mt-2 font-sora text-sm text-white/55 leading-relaxed max-w-xl">{c.desc}</p>
                    {c.visual && <CapVisual kind={c.visual} />}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Módulos (tabs) ─────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="mb-14">
            <Eyebrow>Módulos del sistema</Eyebrow>
            <h2 className="mt-4 font-display font-semibold text-4xl sm:text-5xl leading-[1.02]">Una plataforma completa.</h2>
          </div>
          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-5 px-5 lg:mx-0 lg:px-0">
              {modules.map((m, i) => {
                const Icon = m.icon;
                const on = i === mod;
                return (
                  <button
                    key={m.name}
                    onClick={() => setMod(i)}
                    className={`relative shrink-0 flex items-center gap-3 rounded-2xl px-5 py-4 text-left transition-colors ${on ? 'text-falcon-ink' : 'text-white/60 hover:text-white hover:bg-white/[0.04]'}`}
                  >
                    {on && <motion.span layoutId="mod-pill" className="absolute inset-0 rounded-2xl bg-gradient-to-r from-falcon-cyan to-falcon-sky" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                    <Icon size={18} className="relative" />
                    <span className="relative font-display font-semibold">{m.name}</span>
                  </button>
                );
              })}
            </div>
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-8 lg:p-12 overflow-hidden min-h-[340px]">
              <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-falcon-cyan/10 blur-3xl pointer-events-none" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={mod}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative"
                >
                  <span className="font-mono text-xs text-white/30">{String(mod + 1).padStart(2, '0')} / {String(modules.length).padStart(2, '0')}</span>
                  <h3 className="mt-2 font-display font-bold text-4xl lg:text-5xl">{ActiveMod.name}</h3>
                  <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {ActiveMod.items.map((it, k) => (
                      <motion.li
                        key={it}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + k * 0.05 }}
                        className="flex items-center gap-3 font-sora text-white/75"
                      >
                        <span className="w-6 h-6 rounded-lg bg-falcon-cyan/15 border border-falcon-cyan/30 flex items-center justify-center shrink-0">
                          <CircleCheck size={13} className="text-falcon-cyan" />
                        </span>
                        {it}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── Detalles técnicos ──────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 bg-[#040811] border-y border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <Eyebrow>Detalles técnicos</Eyebrow>
            <h2 className="mt-4 font-display font-semibold text-4xl sm:text-5xl leading-[1.02]">Cómo funciona cada pieza.</h2>
          </div>
          <div className="flex flex-col gap-3">
            {deepFeatures.map((f, i) => (
              <DeepFeature key={f.title} f={f} i={i} open={openFeature === i} onToggle={() => setOpenFeature(openFeature === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Infraestructura ────────────────────────────────────────────── */}
      <section id="infraestructura" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(45% 50% at 20% 50%, rgba(29,78,216,0.18), transparent 70%)' }} />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Eyebrow>Infraestructura</Eyebrow>
            <h2 className="mt-4 font-display font-semibold text-4xl sm:text-5xl leading-[1.02]">
              Diseñada para <span className="text-gradient-falcon">datos públicos críticos</span>.
            </h2>
            <p className="mt-5 font-sora text-white/55 text-lg leading-relaxed">
              Oracle Cloud con región principal en Bogotá y respaldo on-premise en la central. Datos soberanos, infraestructura colombiana.
            </p>
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {infra.map((it, i) => {
                const Icon = it.icon;
                return (
                  <Reveal key={it.title} delay={i * 0.06} className="flex gap-4">
                    <span className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-falcon-cyan" />
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-lg">{it.title}</h3>
                      <p className="mt-1 font-sora text-sm text-white/50 leading-relaxed">{it.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Diagram */}
          <Reveal>
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#0B1B2E] to-[#050A14] p-8 sm:p-10">
              <div className="absolute inset-0 grid-fade opacity-50 rounded-3xl pointer-events-none" />
              <div className="relative flex flex-col items-center gap-0">
                <div className="w-full rounded-2xl border border-falcon-cyan/40 bg-falcon-cyan/[0.07] p-6 shadow-[0_0_50px_-10px_rgba(34,211,238,0.5)]">
                  <div className="flex items-center gap-3">
                    <Cloud className="text-falcon-cyan" size={26} />
                    <div>
                      <p className="font-display font-semibold text-lg">Oracle Cloud Infrastructure</p>
                      <p className="font-mono text-[11px] text-white/50 uppercase tracking-widest">Región principal · Bogotá, Colombia</p>
                    </div>
                    <span className="ml-auto font-mono text-[10px] text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5">99.9%</span>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {['API', 'Socket.IO', 'PostgreSQL'].map((n) => (
                      <span key={n} className="text-center font-mono text-[10px] text-white/60 rounded-lg bg-black/30 border border-white/10 py-2">{n}</span>
                    ))}
                  </div>
                </div>

                <div className="relative h-24 w-px">
                  <svg className="absolute left-1/2 -translate-x-1/2 h-full w-6 overflow-visible" viewBox="0 0 24 96" preserveAspectRatio="none">
                    <line x1="12" y1="0" x2="12" y2="96" stroke="rgba(34,211,238,0.5)" strokeWidth="2" strokeDasharray="5 5">
                      <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite" />
                    </line>
                    <circle cx="12" r="4" fill="#22D3EE">
                      <animate attributeName="cy" values="0;96;0" dur="3s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-falcon-cyan">Replicación continua</span>
                </div>

                <div className="w-full rounded-2xl border border-white/15 bg-white/[0.04] p-6">
                  <div className="flex items-center gap-3">
                    <Server className="text-falcon-sky" size={26} />
                    <div>
                      <p className="font-display font-semibold text-lg">Respaldo on-premise</p>
                      <p className="font-mono text-[11px] text-white/50 uppercase tracking-widest">En la central de emergencias</p>
                    </div>
                    <ShieldCheck className="ml-auto text-emerald-300" size={20} />
                  </div>
                  <p className="mt-4 font-sora text-sm text-white/50 leading-relaxed">Operación garantizada incluso sin conectividad a internet.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Modelo de operación ────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-falcon-ink to-[#06101E]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>Modelo de operación</Eyebrow>
            <h2 className="mt-4 font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
              Implementación rápida, <span className="text-gradient-falcon">operación inmediata</span>.
            </h2>
            <p className="mt-5 font-sora text-white/55 text-lg leading-relaxed">
              Tech Stack Colombia implementa y mantiene la plataforma. Las agencias de respuesta operan coordinadas desde el primer día.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.025] p-7 overflow-hidden group hover:border-falcon-cyan/40 transition-colors">
                  <span
                    className="absolute top-2 right-4 font-display font-bold text-[5.5rem] leading-none text-transparent select-none opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ WebkitTextStroke: '1px rgba(34,211,238,0.35)' }}
                  >
                    {i + 1}
                  </span>
                  <span className="relative font-mono text-xs text-falcon-cyan">Paso {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="relative mt-16 font-display font-semibold text-xl">{s.title}</h3>
                  <p className="relative mt-2 font-sora text-sm text-white/55 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section id="contacto-falcon" className="relative py-24 lg:py-32 px-5 lg:px-8">
        <Reveal>
          <div className="relative max-w-6xl mx-auto rounded-[2.5rem] overflow-hidden border border-white/15 px-6 py-20 sm:px-16 sm:py-24 text-center">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(70% 90% at 0% 0%, #0E7490 0%, transparent 60%), radial-gradient(70% 90% at 100% 100%, #1D4ED8 0%, transparent 60%), linear-gradient(135deg, #062033, #050A14)' }} />
            <div className="absolute inset-0 grid-fade opacity-70" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              {[0, 1, 2].map((i) => (
                <span key={i} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" style={{ width: 420 + i * 220, height: 420 + i * 220 }} />
              ))}
            </div>
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/80">
                <Headset size={13} /> Para agencias de respuesta en Colombia
              </span>
              <h2 className="mt-8 font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.04em] max-w-4xl mx-auto">
                Cuando cada segundo cuenta, la tecnología <span className="text-gradient-falcon">no puede fallar</span>.
              </h2>
              <p className="mt-6 font-sora text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                Te mostramos FALCON CAD en funcionamiento real y respondemos tus preguntas técnicas y operativas.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/#contacto"
                  className="group inline-flex items-center gap-2 font-sora font-semibold text-falcon-ink bg-white hover:bg-falcon-cyan px-8 py-4 rounded-2xl transition-colors shadow-[0_10px_40px_-6px_rgba(255,255,255,0.4)]"
                >
                  Solicitar demostración
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sora font-medium text-white border border-white/25 hover:border-white/50 bg-white/5 backdrop-blur px-8 py-4 rounded-2xl transition-colors"
                >
                  <MessageCircle size={18} /> Escribir por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
