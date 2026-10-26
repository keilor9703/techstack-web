'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Webhook, Video, Smartphone, MapPin, Radio, Activity } from 'lucide-react';

const CHANNELS = {
  '123': { icon: Phone, label: 'Línea 123', color: '#22D3EE' },
  WhatsApp: { icon: MessageCircle, label: 'WhatsApp', color: '#34D399' },
  API: { icon: Webhook, label: 'API', color: '#A78BFA' },
  Video: { icon: Video, label: 'Video', color: '#F472B6' },
  App: { icon: Smartphone, label: 'App', color: '#38BDF8' },
};

const PRIORITY = {
  ALTA: { bg: 'rgba(244,63,94,0.15)', fg: '#FB7185', ring: '#F43F5E' },
  MEDIA: { bg: 'rgba(245,158,11,0.15)', fg: '#FBBF24', ring: '#F59E0B' },
  BAJA: { bg: 'rgba(34,211,238,0.15)', fg: '#67E8F9', ring: '#22D3EE' },
};

const CASE_POOL = [
  { type: 'Incendio estructural', place: 'Cra 15 # 32-10 · Centro', ch: '123', pr: 'ALTA', pin: [372, 150] },
  { type: 'Accidente de tránsito', place: 'Av. Circunvalar km 3', ch: 'WhatsApp', pr: 'ALTA', pin: [180, 250] },
  { type: 'Riña en vía pública', place: 'Parque principal', ch: '123', pr: 'MEDIA', pin: [290, 92] },
  { type: 'Persona herida', place: 'Calle 8 # 4-21 · San José', ch: 'Video', pr: 'ALTA', pin: [450, 285] },
  { type: 'Alarma de pánico', place: 'Comercio · Cra 3 # 10-05', ch: 'API', pr: 'MEDIA', pin: [128, 140] },
  { type: 'Violencia intrafamiliar', place: 'Barrio El Prado', ch: 'WhatsApp', pr: 'ALTA', pin: [330, 320] },
  { type: 'Inundación en vía', place: 'Vereda La Esperanza', ch: 'App', pr: 'MEDIA', pin: [520, 120] },
  { type: 'Árbol caído', place: 'Calle 22 con Cra 9', ch: '123', pr: 'BAJA', pin: [240, 190] },
];

const UNITS = [
  { code: 'B-12', agency: 'Bomberos' },
  { code: 'P-07', agency: 'Policía Nacional' },
  { code: 'A-03', agency: 'Secretaría de Salud' },
  { code: 'DC-02', agency: 'Defensa Civil' },
  { code: 'E-21', agency: 'Ejército Nacional' },
];

const STATUSES = [
  { label: 'Asignada', color: '#A78BFA' },
  { label: 'En ruta', color: '#FBBF24' },
  { label: 'En sitio', color: '#22D3EE' },
  { label: 'Finalizada', color: '#34D399' },
];

const LOG_LINES = [
  'OP-04 creó caso desde Línea 123 · screen-pop',
  'Google ELS recibió ubicación · precisión 8 m',
  'Caso derivado a Bomberos y Secretaría de Salud',
  'Unidad B-12 cambió a «En ruta»',
  'Supervisor agregó nota a la bitácora',
  'WhatsApp: ciudadano envió foto de la escena',
  'Unidad P-07 reportó «En sitio»',
];

const MODULE_TABS = ['Recepción', 'Despacho', 'Mapa', 'Panel', 'Monitor'];

const INITIAL_CASES = [
  { ...CASE_POOL[2], id: 24813, ago: 47 },
  { ...CASE_POOL[1], id: 24812, ago: 96 },
  { ...CASE_POOL[0], id: 24811, ago: 141 },
];

function Elapsed({ born, now }) {
  const s = Math.max(0, Math.floor((now - born) / 1000));
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return <span className="tabular-nums">{mm}:{ss}</span>;
}

export default function CadConsole({ compact = false }) {
  const [cases, setCases] = useState(INITIAL_CASES);
  const seq = useRef({ id: 24813, pool: 3 });
  const [now, setNow] = useState(null);
  const [unitState, setUnitState] = useState([1, 2, 0, 1, 3]);
  const [logIdx, setLogIdx] = useState(0);

  useEffect(() => {
    const t0 = Date.now();
    setNow(t0);
    setCases((prev) => prev.map((c) => ({ ...c, born: t0 - c.ago * 1000 })));
    const clock = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      const n = seq.current;
      n.id += 1;
      const next = { ...CASE_POOL[n.pool % CASE_POOL.length], id: n.id, born: Date.now() };
      n.pool += 1;
      setCases((prev) => [next, ...prev].slice(0, compact ? 3 : 4));
    }, 3600);
    return () => clearInterval(t);
  }, [compact]);

  useEffect(() => {
    const t = setInterval(() => {
      setUnitState((prev) => {
        const next = [...prev];
        const k = Math.floor(Math.random() * next.length);
        next[k] = (next[k] + 1) % STATUSES.length;
        return next;
      });
      setLogIdx((l) => (l + 1) % LOG_LINES.length);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  const clock = now
    ? new Date(now).toLocaleTimeString('es-CO', { hour12: false, timeZone: 'America/Bogota' })
    : '--:--:--';
  const hot = cases[0];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#060D18] text-left shadow-[0_40px_120px_-20px_rgba(34,211,238,0.35)]">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-3 sm:px-4 h-11 border-b border-white/[0.07] bg-[#081221]">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/falcon/falcon-mark.png" alt="" className="w-4 h-4 object-contain" />
          </span>
          <span className="font-sora text-[11px] font-bold tracking-wide text-white">
            FALCON <span className="text-falcon-cyan">CAD</span>
          </span>
        </div>
        <div className={`hidden ${compact ? '2xl:flex' : 'md:flex'} items-center gap-1 ml-3`}>
          {MODULE_TABS.map((t, i) => (
            <span
              key={t}
              className={`font-sora text-[10px] px-2.5 py-1 rounded-md ${i === 0 ? 'bg-falcon-cyan/15 text-falcon-cyan' : 'text-white/40'}`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            EN LÍNEA
          </span>
          <span className="font-mono text-[10px] text-white/50 tabular-nums">{clock}</span>
          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-falcon-cyan to-blue-600 text-[9px] font-bold text-white flex items-center justify-center">OP</span>
        </div>
      </div>

      {/* Body */}
      <div className={`grid grid-cols-1 md:grid-cols-[240px_1fr] ${compact ? '' : 'lg:grid-cols-[250px_1fr_220px]'}`}>
        {/* Queue */}
        <div className="border-b md:border-b-0 md:border-r border-white/[0.07] p-3">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">Bandeja multicanal</span>
            <span className="font-mono text-[9px] text-falcon-cyan">{cases.length} activos</span>
          </div>
          <div className="flex flex-col gap-2 min-h-[236px]">
            <AnimatePresence initial={false}>
              {cases.map((c, i) => {
                const ch = CHANNELS[c.ch];
                const pr = PRIORITY[c.pr];
                const Icon = ch.icon;
                return (
                  <motion.div
                    key={c.id}
                    layout
                    initial={{ opacity: 0, x: -24, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-lg border p-2.5"
                    style={{
                      background: i === 0 ? 'rgba(244,63,94,0.06)' : 'rgba(255,255,255,0.025)',
                      borderColor: i === 0 ? 'rgba(244,63,94,0.35)' : 'rgba(255,255,255,0.07)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: `${ch.color}22` }}>
                        <Icon size={12} color={ch.color} strokeWidth={2.2} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[9px] text-white/40">#{c.id}</span>
                          <span className="font-mono text-[8px] font-bold px-1.5 py-px rounded" style={{ background: pr.bg, color: pr.fg }}>{c.pr}</span>
                        </div>
                        <p className="font-sora text-[11px] font-semibold text-white truncate leading-tight mt-0.5">{c.type}</p>
                      </div>
                      <span className="font-mono text-[9px] text-white/50">{now && c.born ? <Elapsed born={c.born} now={now} /> : '00:00'}</span>
                    </div>
                    <p className="font-sora text-[9.5px] text-white/40 truncate mt-1.5 pl-8">{c.place}</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Map */}
        <div className="relative h-56 md:h-auto min-h-[280px] overflow-hidden bg-[#071425]">
          <svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="cadgrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M24 0H0V24" fill="none" stroke="rgba(56,189,248,0.06)" strokeWidth="1" />
              </pattern>
              <radialGradient id="cadsweep" cx="0" cy="0" r="1">
                <stop offset="0%" stopColor="rgba(34,211,238,0.35)" />
                <stop offset="100%" stopColor="rgba(34,211,238,0)" />
              </radialGradient>
            </defs>
            <rect width="600" height="380" fill="url(#cadgrid)" />
            {/* River */}
            <path d="M-10 300 C 90 260, 160 330, 260 300 S 420 230, 610 260" fill="none" stroke="rgba(56,189,248,0.18)" strokeWidth="14" strokeLinecap="round" />
            {/* Blocks */}
            {[
              [40, 40, 90, 60], [150, 30, 110, 50], [290, 40, 70, 70], [400, 30, 120, 55], [60, 120, 80, 70],
              [170, 110, 100, 60], [300, 130, 120, 50], [450, 110, 100, 70], [90, 210, 90, 40], [210, 200, 120, 50], [380, 190, 90, 45], [500, 200, 80, 40],
            ].map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="rgba(148,163,184,0.05)" stroke="rgba(148,163,184,0.08)" />
            ))}
            {/* Avenues */}
            <path d="M0 100 H600 M0 180 H600 M140 0 V380 M280 0 V380 M430 0 V380" stroke="rgba(148,163,184,0.12)" strokeWidth="5" />
            {/* Route */}
            <path id="cadroute" d="M60 350 L140 350 L140 180 L280 180 L280 100 L372 100 L372 150" fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeDasharray="6 6" opacity="0.8">
              <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite" />
            </path>
            <circle r="6" fill="#22D3EE">
              <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
                <mpath href="#cadroute" />
              </animateMotion>
            </circle>
            <circle cx="60" cy="350" r="7" fill="#0B1B2E" stroke="#22D3EE" strokeWidth="2" />

            {cases.map((c, i) => {
              const pr = PRIORITY[c.pr];
              return (
                <g key={c.id} transform={`translate(${c.pin[0]} ${c.pin[1]})`}>
                  <circle r="5" fill={pr.ring} />
                  <circle r="5" fill="none" stroke={pr.ring} strokeWidth="2">
                    <animate attributeName="r" from="5" to={i === 0 ? 34 : 20} dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.9" to="0" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
            {hot && (
              <g transform={`translate(${hot.pin[0]} ${hot.pin[1]})`}>
                <path d="M0 0 L70 -24 A74 74 0 0 1 70 24 Z" fill="url(#cadsweep)">
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3.5s" repeatCount="indefinite" />
                </path>
              </g>
            )}
          </svg>

          {/* Overlays */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-md bg-black/50 backdrop-blur px-2 py-1 border border-white/10">
            <MapPin size={11} className="text-falcon-cyan" />
            <span className="font-mono text-[9px] text-white/80">Google ELS · precisión 8 m</span>
          </div>
          {hot && (
            <AnimatePresence mode="wait">
              <motion.div
                key={hot.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-3 left-3 right-3 sm:right-auto rounded-lg bg-black/60 backdrop-blur border border-rose-500/30 px-3 py-2"
              >
                <p className="font-mono text-[8.5px] uppercase tracking-widest text-rose-300">Nuevo caso · #{hot.id}</p>
                <p className="font-sora text-[11px] text-white font-semibold">{hot.type}</p>
                <p className="font-mono text-[9px] text-white/50">Despacho sugerido: {hot.pr === 'ALTA' ? 'Bomberos + Salud + Policía' : 'Policía Nacional'}</p>
              </motion.div>
            </AnimatePresence>
          )}
          <div className="absolute top-3 right-3 hidden sm:flex items-center gap-1.5 rounded-md bg-black/50 backdrop-blur px-2 py-1 border border-white/10">
            <Radio size={11} className="text-rose-400" />
            <span className="font-mono text-[9px] text-white/80">Unidad B-12 en ruta</span>
          </div>
        </div>

        {/* Units */}
        {!compact && (
          <div className="hidden lg:flex flex-col border-l border-white/[0.07] p-3 gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40 px-1 mb-0.5">Unidades</span>
            {UNITS.map((u, i) => {
              const st = STATUSES[unitState[i]];
              return (
                <div key={u.code} className="flex items-center justify-between rounded-lg bg-white/[0.025] border border-white/[0.07] px-2.5 py-2">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] text-white font-semibold">{u.code}</p>
                    <p className="font-sora text-[9px] text-white/40 truncate">{u.agency}</p>
                  </div>
                  <motion.span
                    key={st.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-mono text-[8.5px] font-semibold px-1.5 py-0.5 rounded"
                    style={{ color: st.color, background: `${st.color}1f` }}
                  >
                    {st.label}
                  </motion.span>
                </div>
              );
            })}
            <div className="mt-auto rounded-lg border border-white/[0.07] bg-gradient-to-br from-falcon-cyan/10 to-transparent p-2.5">
              <div className="flex items-center gap-1.5">
                <Activity size={11} className="text-falcon-cyan" />
                <span className="font-sora text-[9px] text-white/50">Tiempo medio de despacho</span>
              </div>
              <p className="font-display text-xl font-semibold text-white mt-1 tabular-nums">01:42</p>
              <div className="flex items-end gap-[3px] h-6 mt-1">
                {[40, 65, 50, 80, 55, 70, 45, 90, 60, 75, 52, 68].map((h, i) => (
                  <span key={i} className="flex-1 rounded-sm bg-falcon-cyan/60" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Log ticker */}
      <div className="flex items-center gap-3 h-8 px-4 border-t border-white/[0.07] bg-[#081221] overflow-hidden">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-falcon-cyan shrink-0">Bitácora</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={logIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-[10px] text-white/55 truncate"
          >
            <span className="text-white/30">{clock} · </span>
            {LOG_LINES[logIdx]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
