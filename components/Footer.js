export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] py-8 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-white font-bold text-lg">TechStack<span className="text-blue-500">.</span></span>
        <p className="text-gray-500 text-sm">© 2024 TechStack Colombia. Todos los derechos reservados.</p>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
          <a href="#portafolio" className="hover:text-white transition-colors">Portafolio</a>
          <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  )
}
