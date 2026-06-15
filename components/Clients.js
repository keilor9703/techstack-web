'use client';

import { motion } from 'framer-motion';

// ─── Add new clients here ──────────────────────────────────────────────────────
// Each entry needs: name, sector, logo (path in /public/clients/) or null for text fallback
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

// Duplicate the list so the marquee loops seamlessly
const track = [...clients, ...clients, ...clients, ...clients];

function ClientCard({ client }) {
  return (
    <div className="group flex-shrink-0 flex items-center gap-3 mx-6 px-6 py-4 bg-white border border-gray-100 rounded-2xl hover:border-azulStack/30 hover:shadow-md hover:shadow-azulStack/5 transition-all duration-300 cursor-default select-none">
      {client.logo ? (
        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center">
          <img
            src={client.logo}
            alt={client.name}
            className="w-full h-full object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
          />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-xl bg-azulTinte flex items-center justify-center flex-shrink-0">
          <span className="font-sora font-bold text-azulStack text-sm">
            {client.name.charAt(0)}
          </span>
        </div>
      )}
      <div className="flex flex-col leading-tight">
        <span className="font-sora font-semibold text-sm text-grafito group-hover:text-azulStack transition-colors duration-200 whitespace-nowrap">
          {client.name}
        </span>
        <span className="font-sora text-[11px] text-acero/70 whitespace-nowrap">
          {client.sector}
        </span>
      </div>
    </div>
  );
}

export default function Clients() {
  return (
    <section className="py-16 bg-papel border-y border-gray-100/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 text-center">
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

      {/* Marquee track — overflow hidden on parent, no scroll bars */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-papel to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-papel to-transparent" />

        <div className="flex animate-marquee w-max">
          {track.map((client, i) => (
            <ClientCard key={i} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}
