'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Ksmart360', href: '#ksmart360' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (!href || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:bg-[#0C0E15]/90 dark:border-white/5'
          : 'bg-transparent'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-azulStack focus:text-white focus:rounded-lg focus:font-sora focus:text-sm focus:font-semibold"
      >
        Saltar al contenido
      </a>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-3"
          >
            {/* Icon mark */}
            <svg width="34" height="34" viewBox="0 0 100 100" fill="none" className="flex-shrink-0">
              <rect width="100" height="100" rx="22" fill="#2E68E6"/>
              <rect x="20" y="22" width="60" height="14" rx="7" fill="white"/>
              <rect x="20" y="43" width="47" height="14" rx="7" fill="rgba(255,255,255,0.75)"/>
              <rect x="20" y="64" width="34" height="14" rx="7" fill="rgba(255,255,255,0.5)"/>
            </svg>
            <div className="flex flex-col leading-none">
              <span className={`font-sora font-bold text-base tracking-tight transition-colors duration-300 ${scrolled ? 'text-grafito dark:text-white' : 'text-white'}`}>
                Tech Stack
              </span>
              <span className={`font-sora text-[10px] font-medium transition-colors duration-300 ${scrolled ? 'text-acero dark:text-white/70' : 'text-white/60'}`}>
                Colombia S.A.S.
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-sora text-sm font-medium transition-colors duration-200 hover:text-azul ${
                  scrolled ? 'text-grafito dark:text-white' : 'text-white/80'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Socials + Theme + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Social icons — desktop only */}
            <div className={`hidden lg:flex items-center gap-1.5 pr-3 border-r transition-colors duration-300 ${scrolled ? 'border-gray-200 dark:border-white/10' : 'border-white/20'}`}>
              <a
                href="https://www.linkedin.com/company/tech-stack-colombia-s-a-s"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${scrolled ? 'text-acero hover:text-azulStack hover:bg-gray-100 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-azulStack' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/tech.stackcol?igsh=MTVzemx3eTB6NmkzcQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${scrolled ? 'text-acero hover:text-pink-500 hover:bg-gray-100 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-pink-400' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/1CcYPVkCth/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${scrolled ? 'text-acero hover:text-blue-600 hover:bg-gray-100 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-blue-400' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </a>
            </div>

            <ThemeToggle className={scrolled ? 'text-grafito hover:bg-gray-100 dark:text-white dark:hover:bg-white/10' : 'text-white hover:bg-white/10'} />
            <a
              href="https://www.appjeylor.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-all duration-200 font-sora"
              style={{ background: 'linear-gradient(135deg, #2E68E6 0%, #7C3AED 100%)', boxShadow: '0 0 20px rgba(46,104,230,0.25)' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 28px rgba(124,58,237,0.4)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(46,104,230,0.25)'}
            >
              Probar Ksmart360
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? 'bg-grafito' : 'bg-white'
                } ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? 'bg-grafito' : 'bg-white'
                } ${menuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  scrolled ? 'bg-grafito' : 'bg-white'
                } ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white border-b border-gray-100 dark:bg-[#13161F] dark:border-white/5"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-sora text-grafito dark:text-white text-sm font-medium py-3 border-b border-gray-50 dark:border-white/5 last:border-0 hover:text-azul transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="https://www.appjeylor.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex justify-center items-center px-5 py-3 bg-azul text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors font-sora"
              >
                Probar Ksmart360
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
