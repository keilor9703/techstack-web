'use client';

import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Ksmart360', href: '#ksmart360' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

function handleScrollTo(e, href) {
  e.preventDefault();
  if (href === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  setTimeout(() => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

export default function Footer() {
  return (
    <footer className="bg-grafito text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1"
          >
            <a
              href="#"
              onClick={(e) => handleScrollTo(e, '#')}
              className="inline-flex items-center gap-3 mb-4"
              aria-label="Tech Stack Colombia — Ir al inicio"
            >
              <svg width="36" height="36" viewBox="0 0 100 100" fill="none" className="flex-shrink-0">
                <rect width="100" height="100" rx="22" fill="#2E68E6"/>
                <rect x="20" y="22" width="60" height="14" rx="7" fill="white"/>
                <rect x="20" y="43" width="47" height="14" rx="7" fill="rgba(255,255,255,0.75)"/>
                <rect x="20" y="64" width="34" height="14" rx="7" fill="rgba(255,255,255,0.5)"/>
              </svg>
              <div className="flex flex-col leading-none">
                <span className="font-sora font-bold text-lg text-white tracking-tight">Tech Stack</span>
                <span className="font-sora text-[10px] font-medium text-white/50 mt-0.5">Colombia S.A.S.</span>
              </div>
            </a>
            <p className="text-white/50 text-sm font-sora leading-relaxed max-w-xs">
              Transformamos operaciones empresariales en ventajas competitivas a través
              de software a medida y productos propios como Ksmart360.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/tech-stack-colombia-s-a-s"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-azulStack flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/tech.stackcol?igsh=MTVzemx3eTB6NmkzcQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-pink-500 flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1CcYPVkCth/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Navigation column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-sora font-semibold text-sm text-white/70 uppercase tracking-widest mb-5">
              Navegación
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-white/50 hover:text-white font-sora text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-sora font-semibold text-sm text-white/70 uppercase tracking-widest mb-5">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contacto@techstackcol.com"
                  className="flex items-center gap-3 group"
                >
                  <svg
                    className="w-4 h-4 text-white/40 group-hover:text-azulStack transition-colors duration-200 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-white/50 group-hover:text-white font-sora text-sm transition-colors duration-200">
                    contacto@techstackcol.com
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-white/40 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-white/50 font-sora text-sm">Colombia</span>
              </li>
              <li>
                <div className="mt-2">
                  <span className="font-mono text-xs text-white/30">
                    Producto estrella:
                  </span>
                  <p className="text-azulStack font-sora font-semibold text-sm mt-0.5">
                    Ksmart360 ERP v2.0
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-sora text-center sm:text-left">
            © 2026 Tech Stack Colombia S.A.S. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
