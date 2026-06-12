export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">Nosotros</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">El equipo detrás<br />de tu éxito digital</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Somos una agencia de tecnología colombiana con más de 5 años construyendo soluciones digitales para empresas de todos los sectores. Nuestro equipo de ingenieros, diseñadores y estrategas trabaja con metodologías ágiles para entregar resultados reales.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Creemos que la tecnología debe ser accesible, escalable y orientada al negocio. Por eso, cada proyecto lo abordamos como si fuera nuestro propio emprendimiento.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[['5+','Años de experiencia'],['50+','Proyectos entregados'],['100%','Clientes satisfechos']].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-bold text-blue-400 mb-1">{n}</div>
                  <div className="text-gray-500 text-sm">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['React & Next.js','Node.js & Python','AWS & GCP','React Native','PostgreSQL','MongoDB','Docker & K8s','Figma & Design'].map(t => (
              <div key={t} className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl">
                <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                <span className="text-gray-300 text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
