'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// ─── Add new clients here ──────────────────────────────────────────────────────
const clients = [
  {
    name: 'Vialmar Cacao',
    sector: 'Agroindustria · Colombia',
    logo: '/clients/vialmar.webp',
  },
  {
    name: 'Calzado EYA',
    sector: 'Retail · Calzado',
    logo: '/clients/eya.webp',
  },
  {
    name: 'Peletería Jeylor',
    sector: 'Retail · Peletería',
    logo: '/clients/jeylor.webp',
  },
];
// ──────────────────────────────────────────────────────────────────────────────

const track = [...clients, ...clients, ...clients, ...clients];

function ClientCard({ client }) {
  return (
    <div className="group flex-shrink-0 flex items-center gap-5 mx-4 px-8 py-6 bg-white dark:bg-[#13161F] border border-gray-100 dark:border-white/10 rounded-2xl hover:border-azulStack/30 hover:shadow-xl hover:shadow-azulStack/8 transition-all duration-300 cursor-default select-none">
      {client.logo ? (
        <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50 dark:bg-white/5 flex items-center justify-center">
          <Image
            src={client.logo}
            alt={client.name}
            width={96}
            height={96}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-24 h-24 rounded-2xl bg-azulTinte flex items-center justify-center flex-shrink-0">
          <span className="font-sora font-bold text-azulStack text-2xl">
            {client.name.charAt(0)}
          </span>
        </div>
      )}
      <div className="flex flex-col leading-tight">
        <span className="font-sora font-bold text-base text-grafito dark:text-white whitespace-nowrap">
          {client.name}
        </span>
        <span className="font-sora text-sm text-acero dark:text-white/50 whitespace-nowrap mt-0.5">
          {client.sector}
        </span>
      </div>
    </div>
  );
}

export default function Clients({ label = 'Empresas que confían en Tech Stack Colombia' }) {
  return (
    <section className="py-14 bg-papel border-y border-gray-100/80 dark:border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-mono font-medium text-azulStack bg-azulTinte px-3 py-1.5 rounded-full tracking-wider uppercase"
        >
          {label}
        </motion.span>
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
