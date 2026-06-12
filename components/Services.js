const services = [
  { icon: '🌐', title: 'Desarrollo Web', desc: 'Sitios y aplicaciones web modernas, rápidas y escalables con React, Next.js y tecnologías de vanguardia.' },
  { icon: '📱', title: 'Apps Móviles', desc: 'Aplicaciones iOS y Android nativas e híbridas con React Native que impresionan a tus usuarios.' },
  { icon: '☁️', title: 'Cloud & DevOps', desc: 'Infraestructura en AWS, GCP y Azure. CI/CD, Docker, Kubernetes para escalar sin fricción.' },
  { icon: '🤖', title: 'Inteligencia Artificial', desc: 'Integración de IA generativa, chatbots, automatización y análisis de datos con modelos de última generación.' },
  { icon: '🎨', title: 'UI/UX Design', desc: 'Diseño de interfaces centradas en el usuario. Prototipado, design systems y experiencias que convierten.' },
  { icon: '🔒', title: 'Ciberseguridad', desc: 'Auditorías de seguridad, pentesting y hardening para proteger tus activos digitales.' },
]

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">Lo que hacemos</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Servicios que impulsan<br />tu crecimiento</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Soluciones tecnológicas end-to-end para empresas que exigen excelencia.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:bg-white/[0.06] hover:border-blue-500/30 transition-all duration-300">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
