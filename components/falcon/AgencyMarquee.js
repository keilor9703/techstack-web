'use client';

import { Shield, Flame, LifeBuoy, Star, HeartPulse, Users, Plus, TrafficCone, Siren, Ambulance, Building2, Radio } from 'lucide-react';

const ROW_A = [
  { icon: Shield, name: 'Policía Nacional', color: '#38BDF8' },
  { icon: Flame, name: 'Cuerpo de Bomberos', color: '#FB7185' },
  { icon: LifeBuoy, name: 'Defensa Civil', color: '#FBBF24' },
  { icon: Star, name: 'Ejército Nacional', color: '#A3E635' },
  { icon: HeartPulse, name: 'Secretaría de Salud', color: '#F472B6' },
  { icon: Users, name: 'Comisarías de Familia', color: '#A78BFA' },
];

const ROW_B = [
  { icon: Plus, name: 'Cruz Roja', color: '#F87171' },
  { icon: TrafficCone, name: 'Tránsito y Movilidad', color: '#FB923C' },
  { icon: Siren, name: 'Gestión del Riesgo', color: '#22D3EE' },
  { icon: Ambulance, name: 'Centro Regulador de Urgencias', color: '#34D399' },
  { icon: Building2, name: 'Secretaría de Gobierno', color: '#60A5FA' },
  { icon: Radio, name: 'Organismos de socorro', color: '#E879F9' },
];

function Row({ items, reverse }) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className={`flex gap-3 shrink-0 w-max ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}>
        {loop.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={i} className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] pl-2 pr-5 py-2 backdrop-blur">
              <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${a.color}22` }}>
                <Icon size={15} color={a.color} strokeWidth={2} />
              </span>
              <span className="font-sora text-sm text-white/80 whitespace-nowrap">{a.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AgencyMarquee() {
  return (
    <div className="flex flex-col gap-3">
      <Row items={ROW_A} />
      <Row items={ROW_B} reverse />
    </div>
  );
}
