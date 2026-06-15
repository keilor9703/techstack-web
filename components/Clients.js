'use client';

import { motion } from 'framer-motion';

// ─── Add new clients here ──────────────────────────────────────────────────────
const clients = [
  {
    name: 'Vialmar Cacao',
    sector: 'Agroindustria · Colombia',
    logo: '/clients/vialmar.jpg',
  },
  {
    name: 'Calzado EYA',
    sector: 'Retail · Calzado',
    logo: '/clients/eya.webp',
  },
];
// ──────────────────────────────────────────────────────────────────────────────

const track = [...clients, ...clients, ...clients, ...clients];

function ClientCard({ client }) {
  return (
    <div className="group flex-shrink-0 flex items-center gap-4 mx-4 px-7 py-5 bg-white border border-gray-100 rounded-2xl hover:border-azulStack/30 hover:shadow-xl hover:shadow-azulStack/8 transition-all duration-300 cursor-default select-none">
      {client.logo ? (
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center">
          <img
            src={client.logo}
            alt={client.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="w-16 h-16 rounded-xl bg-azulTinte flex items-center justify-center flex-shrink-0">
          <span className="font-sora font-bold text-azulStack text-xl">
            {client.name.charAt(0)}
          </span>
        </div>
      )}
      <div className="flex flex-col leading-tight">
        <span className="font-sora font-bold text-base text-grafito whitespace-nowrap">
          {client.name}
        </span>
        <span className="font-sora text-sm text-acero/70 whitespace-nowrap mt-0.5">
          {client.sector}
        </span>
      </div>
    </div>
  );
}

export default function Clients() {
  return (
    <section className="py-14 bg-papel border-y border-gray-100/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] font-medium text-acero/50 tracking-widest uppercase"
        >
          Empresas que confían en Ksmart360
        </motion.p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-28 z-10 bg-gradient-to-r from-papel to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-28 z-10 bg-gradient-to-l from-papel to-transparent" />

        <div className="flex animate-marquee w-max">
          {track.map((client, i) => (
            <ClientCard key={i} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}
