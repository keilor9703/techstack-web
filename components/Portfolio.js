const projects = [
  { tag: 'E-commerce', title: 'Tienda Online Moda', desc: 'Plataforma de venta con pagos PSE, Wompi y gestión de inventario en tiempo real.', tech: ['Next.js', 'Stripe', 'PostgreSQL'], color: 'from-purple-600/20 to-blue-600/20' },
  { tag: 'SaaS', title: 'Dashboard Analytics', desc: 'Panel de control con reportes en tiempo real, BI y exportación a múltiples formatos.', tech: ['React', 'Node.js', 'MongoDB'], color: 'from-blue-600/20 to-cyan-600/20' },
  { tag: 'App Móvil', title: 'App Logística', desc: 'Aplicación de seguimiento de envíos con GPS en tiempo real para empresa de mensajería.', tech: ['React Native', 'Firebase', 'Maps'], color: 'from-green-600/20 to-blue-600/20' },
  { tag: 'Corporativo', title: 'Portal Empresarial', desc: 'Intranet corporativa con gestión de RRHH, documentos y flujos de aprobación.', tech: ['Next.js', 'Prisma', 'AWS'], color: 'from-orange-600/20 to-red-600/20' },
]

export default function Portfolio() {
  return (
    <section id="portafolio" className="py-24 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">Portafolio</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Proyectos que hablan<br />por sí solos</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div key={p.title} className={`relative p-8 rounded-2xl border border-white/[0.08] bg-gradient-to-br ${p.color} overflow-hidden group hover:border-white/20 transition-all duration-300`}>
              <span className="inline-block px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full mb-4">{p.tag}</span>
              <h3 className="text-white text-xl font-bold mb-2">{p.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{p.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {p.tech.map(t => <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 text-gray-400 text-xs rounded">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
