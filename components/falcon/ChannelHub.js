'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Webhook, Video, MapPin, Globe } from 'lucide-react';

export const CHANNELS = [
  { icon: Phone, label: 'Línea 123', color: '#22D3EE', desc: 'Integración directa con la planta telefónica (PBX) de la central de emergencias. Screen-pop automático al timbrar: el operador ve quién llama antes de contestar.' },
  { icon: MessageCircle, label: 'WhatsApp', color: '#34D399', desc: 'El ciudadano reporta por WhatsApp y el sistema crea el caso automáticamente, con toda la conversación adjunta al expediente.' },
  { icon: Video, label: 'Videollamada', color: '#F472B6', desc: 'Streaming de video con el ciudadano en tiempo real para evaluar la magnitud de la emergencia antes de definir el despacho.' },
  { icon: MapPin, label: 'Google ELS', color: '#FB7185', desc: 'Emergency Location Service: el celular del ciudadano comparte su ubicación GPS precisa en el momento de la llamada.' },
  { icon: Webhook, label: 'API externa', color: '#A78BFA', desc: 'Centrales de alarmas, botones de pánico y otras entidades radican casos vía API REST, cada una con su propia credencial.' },
  { icon: Globe, label: 'Apps web y móviles', color: '#38BDF8', desc: 'Cualquier aplicación web o móvil puede integrarse para reportar emergencias al sistema. FALCON CAD es abierto por diseño.' },
];

const R = 41;

export default function ChannelHub() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % CHANNELS.length), 3200);
    return () => clearInterval(t);
  }, [paused]);

  const nodes = CHANNELS.map((c, i) => {
    const ang = (i / CHANNELS.length) * Math.PI * 2 - Math.PI / 2;
    return { ...c, x: +(50 + R * Math.cos(ang)).toFixed(2), y: +(50 + R * Math.sin(ang)).toFixed(2) };
  });

  return (
    <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
      {/* Diagram */}
      <div className="relative w-full max-w-[520px] mx-auto aspect-square">
        <div className="absolute inset-[9%] rounded-full border border-dashed border-white/10 animate-spin-slow" />
        <div className="absolute inset-[24%] rounded-full border border-white/[0.06]" />
        <div className="absolute inset-[34%] rounded-full bg-falcon-cyan/10 blur-2xl" />

        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
          {nodes.map((n, i) => {
            const on = i === active;
            return (
              <g key={n.label}>
                <line
                  x1={n.x} y1={n.y} x2="50" y2="50"
                  stroke={on ? n.color : 'rgba(255,255,255,0.12)'}
                  strokeWidth={on ? 0.6 : 0.3}
                  strokeDasharray="1.2 1.2"
                >
                  <animate attributeName="stroke-dashoffset" from="0" to="-4.8" dur="1s" repeatCount="indefinite" />
                </line>
                {on && (
                  <circle r="1.1" fill={n.color}>
                    <animateMotion dur="1.2s" repeatCount="indefinite" path={`M${n.x} ${n.y} L50 50`} />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square">
          <span className="absolute inset-0 rounded-full bg-falcon-cyan/20 animate-ping-slow" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#0B1B2E] to-[#06101D] border border-falcon-cyan/40 shadow-[0_0_60px_rgba(34,211,238,0.35)] flex flex-col items-center justify-center gap-1.5">
            <span className="w-[38%] aspect-square rounded-xl bg-white flex items-center justify-center shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/falcon/falcon-mark.png" alt="FALCON CAD" className="w-[72%] h-[72%] object-contain" />
            </span>
            <span className="font-display text-[11px] sm:text-xs font-bold text-white tracking-wide">FALCON CAD</span>
          </div>
        </div>

        {/* Nodes */}
        {nodes.map((n, i) => {
          const Icon = n.icon;
          const on = i === active;
          return (
            <button
              key={n.label}
              type="button"
              onMouseEnter={() => { setPaused(true); setActive(i); }}
              onMouseLeave={() => setPaused(false)}
              onClick={() => setActive(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              aria-label={n.label}
            >
              <motion.span
                animate={{ scale: on ? 1.15 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border backdrop-blur"
                style={{
                  background: on ? `${n.color}26` : 'rgba(255,255,255,0.04)',
                  borderColor: on ? n.color : 'rgba(255,255,255,0.12)',
                  boxShadow: on ? `0 0 32px ${n.color}66` : 'none',
                }}
              >
                <Icon size={22} color={on ? n.color : 'rgba(255,255,255,0.7)'} strokeWidth={1.8} />
              </motion.span>
              <span className={`font-sora text-[10px] sm:text-[11px] whitespace-nowrap transition-colors ${on ? 'text-white' : 'text-white/45'}`}>{n.label}</span>
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="flex flex-col gap-2" onMouseLeave={() => setPaused(false)}>
        {CHANNELS.map((c, i) => {
          const Icon = c.icon;
          const on = i === active;
          return (
            <button
              key={c.label}
              type="button"
              onMouseEnter={() => { setPaused(true); setActive(i); }}
              onClick={() => setActive(i)}
              className={`relative text-left rounded-2xl border px-5 py-4 transition-colors duration-300 ${on ? 'bg-white/[0.05] border-white/15' : 'bg-transparent border-transparent hover:bg-white/[0.03]'}`}
            >
              {on && <motion.span layoutId="ch-bar" className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full" style={{ background: c.color }} />}
              <div className="flex items-center gap-3">
                <Icon size={18} color={on ? c.color : 'rgba(255,255,255,0.5)'} strokeWidth={1.8} />
                <span className={`font-display text-lg font-semibold ${on ? 'text-white' : 'text-white/55'}`}>{c.label}</span>
              </div>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-sora text-sm text-white/55 leading-relaxed overflow-hidden pl-[30px]"
                  >
                    <span className="block pt-2">{c.desc}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
}
