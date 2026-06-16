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

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <ThemeToggle className={scrolled ? 'text-grafito hover:bg-gray-100 dark:text-white dark:hover:bg-white/10' : 'text-white hover:bg-white/10'} />
            <a
              href="https://www.appjeylor.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center px-5 py-2.5 bg-azul text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200 font-sora"
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
