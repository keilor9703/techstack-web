'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Grid background */}
      <div className="absolute inset-0" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',backgroundSize:'60px 60px'}} />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          Disponibles para nuevos proyectos
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Construimos el<br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">futuro digital</span><br />
          de tu empresa
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Desarrollo web, apps móviles y soluciones cloud para empresas colombianas que quieren crecer sin límites.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contacto" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105">
            Empezar proyecto →
          </a>
          <a href="#portafolio" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all duration-200">
            Ver portafolio
          </a>
        </div>
        <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500">
          <div className="text-center"><div className="text-2xl font-bold text-white">50+</div>proyectos</div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center"><div className="text-2xl font-bold text-white">30+</div>clientes</div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center"><div className="text-2xl font-bold text-white">5★</div>calificación</div>
        </div>
      </div>
    </section>
  )
}
