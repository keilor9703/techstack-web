'use client'
export default function Contact() {
  return (
    <section id="contacto" className="py-24 bg-[#080808]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">Contacto</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">¿Listo para empezar?</h2>
        <p className="text-gray-400 mb-10">Cuéntanos tu proyecto y te respondemos en menos de 24 horas con una propuesta personalizada.</p>
        <form className="flex flex-col gap-4 text-left" onSubmit={e => { e.preventDefault(); alert('¡Mensaje enviado! Te contactaremos pronto.') }}>
          <div className="grid md:grid-cols-2 gap-4">
            <input required placeholder="Tu nombre" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors" />
            <input required type="email" placeholder="Tu email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <input placeholder="Empresa (opcional)" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors" />
          <textarea required rows={4} placeholder="Cuéntanos sobre tu proyecto..." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none" />
          <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02]">
            Enviar mensaje →
          </button>
        </form>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
          <a href="mailto:hola@techstackcol.com" className="hover:text-white transition-colors">hola@techstackcol.com</a>
          <a href="https://wa.me/573000000000" className="hover:text-white transition-colors">WhatsApp</a>
          <a href="https://www.linkedin.com/company/techstackcol" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </section>
  )
}
