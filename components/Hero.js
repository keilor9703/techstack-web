'use client';
import { motion } from 'framer-motion';

const codeLines = [
  { tokens: [{ type: 'keyword', text: 'const' }, { type: 'plain', text: ' stack = {' }] },
  { tokens: [{ type: 'plain', text: '  backend: ' }, { type: 'string', text: '"FastAPI + PostgreSQL"' }, { type: 'plain', text: ',' }] },
  { tokens: [{ type: 'plain', text: '  frontend: ' }, { type: 'string', text: '"React + Next.js"' }, { type: 'plain', text: ',' }] },
  { tokens: [{ type: 'plain', text: '  cloud: ' }, { type: 'string', text: '"Oracle Cloud (OCI)"' }, { type: 'plain', text: ',' }] },
  { tokens: [{ type: 'plain', text: '  product: ' }, { type: 'amber', text: '"Ksmart360 v2.0"' }] },
  { tokens: [{ type: 'plain', text: '};' }] },
];
const tokenColors = { keyword: 'text-blue-400', string: 'text-green-400', amber: 'text-amber-400', plain: 'text-gray-300' };
const cv = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const iv = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } };

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen bg-grafito flex items-center overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #6A6F7E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-azul/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={cv} initial="hidden" animate="visible" className="flex flex-col">
            <motion.div variants={iv}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-azul/20 border border-azul/30 rounded-full text-xs font-mono text-azul font-medium mb-6">
                <span className="w-1.5 h-1.5 bg-azul rounded-full animate-pulse" />
                Desarrollo de software · Colombia
              </span>
            </motion.div>
            <motion.h1 variants={iv} className="font-sora font-bold text-4xl lg:text-5xl xl:text-6xl text-white leading-tight tracking-tight mb-6">
              Construimos el software que <span className="text-azul">impulsa tu negocio</span>
            </motion.h1>
            <motion.p variants={iv} className="font-sora text-base lg:text-lg text-white/60 leading-relaxed mb-10 max-w-xl">
              Soluciones tecnológicas a medida para empresas colombianas. Desde sistemas ERP hasta plataformas digitales, transformamos procesos en ventajas competitivas.
            </motion.p>
            <motion.div variants={iv} className="flex flex-wrap gap-4">
              <a href="#contacto" onClick={(e) => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-azul text-white font-semibold text-sm rounded-xl hover:bg-blue-600 transition-colors duration-200 font-sora">
                Solicitar demo
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="#servicios" onClick={(e) => { e.preventDefault(); document.querySelector('#servicios')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white font-semibold text-sm rounded-xl hover:border-white/40 hover:bg-white/5 transition-all duration-200 font-sora">
                Ver servicios
              </a>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22,1,0.36,1] }} className="flex justify-center lg:justify-end">
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="w-full max-w-md">
              <div className="bg-[#0D0F16] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#0A0C12] border-b border-white/5">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" /><span className="w-3 h-3 rounded-full bg-yellow-500/70" /><span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-4 text-xs text-white/30 font-mono">stack.config.js</span>
                </div>
                <div className="p-6">
                  <pre className="font-mono text-sm leading-7">
                    {codeLines.map((line, li) => (
                      <div key={li} className="flex">
                        <span className="select-none text-white/20 w-8 text-right mr-4 text-xs pt-0.5">{li + 1}</span>
                        <span>{line.tokens.map((tok, ti) => <span key={ti} className={tokenColors[tok.type]}>{tok.text}</span>)}</span>
                      </div>
                    ))}
                  </pre>
                </div>
                <div className="px-6 pb-5 flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-green-400 font-mono"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />Sistema en producción</span>
                  <span className="text-white/20 text-xs">·</span>
                  <span className="text-xs text-white/40 font-mono">Oracle Cloud OCI</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-papel to-transparent" />
    </section>
  );
}
