'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';

const navLinks = [
  { label: 'Nosotros',  href: '#nosotros'  },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Ksmart360', href: '#ksmart360' },
  { label: 'Portafolio',href: '#portafolio'},
  { label: 'FAQ',       href: '#faq'       },
  { label: 'Contacto',  href: '#contacto'  },
];

const socialLinks = [
  {
    href: 'https://www.linkedin.com/company/tech-stack-colombia-s-a-s',
    label: 'LinkedIn',
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/tech.stackcol?igsh=MTVzemx3eTB6NmkzcQ==',
    label: 'Instagram',
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    href: 'https://www.facebook.com/share/1CcYPVkCth/',
    label: 'Facebook',
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    setActiveLink(href);
    if (!href || href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const target = document.querySelector(href);
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-azulStack focus:text-white focus:rounded-lg focus:font-sora focus:text-sm"
      >
        Saltar al contenido
      </a>

      {/* ── Floating pill wrapper ── */}
      <motion.header
        initial={false}
        animate={scrolled ? 'scrolled' : 'top'}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{ pointerEvents: 'none' }}
      >
        <motion.div
          variants={{
            top: {
              marginTop: 0,
              borderRadius: 0,
              maxWidth: '100%',
              paddingLeft: 24,
              paddingRight: 24,
              boxShadow: 'none',
              borderColor: 'rgba(255,255,255,0)',
              backgroundColor: 'rgba(0,0,0,0)',
              backdropFilter: 'blur(0px)',
            },
            scrolled: {
              marginTop: 12,
              borderRadius: 16,
              maxWidth: 980,
              paddingLeft: 20,
              paddingRight: 20,
              boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.05) inset',
              borderColor: 'rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(13,15,22,0.82)',
              backdropFilter: 'blur(20px)',
            },
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full border"
          style={{ pointerEvents: 'auto' }}
        >
          <div
            className="flex items-center justify-between"
            style={{ height: scrolled ? 52 : 72, transition: 'height 0.45s cubic-bezier(0.22,1,0.36,1)' }}
          >
            {/* ── Logo ── */}
            <motion.a
              href="#"
              onClick={(e) => handleNavClick(e, '#')}
              className="flex items-center gap-2.5 flex-shrink-0"
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={scrolled ? { scale: 0.85 } : { scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex-shrink-0"
              >
                <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" rx="22" fill="#2E68E6"/>
                  <rect x="20" y="22" width="60" height="14" rx="7" fill="white"/>
                  <rect x="20" y="43" width="47" height="14" rx="7" fill="rgba(255,255,255,0.75)"/>
                  <rect x="20" y="64" width="34" height="14" rx="7" fill="rgba(255,255,255,0.5)"/>
                </svg>
              </motion.div>
              <motion.div
                className="flex flex-col leading-none overflow-hidden"
                animate={scrolled ? { opacity: 1 } : { opacity: 1 }}
              >
                <motion.span
                  className="font-sora font-light text-sm tracking-wide text-white"
                  animate={scrolled ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
                >
                  Tech Stack
                </motion.span>
                <motion.span
                  className="font-sora text-[9px] font-light text-white/50 tracking-wider uppercase"
                  animate={scrolled ? { opacity: 0, height: 0 } : { opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  Colombia S.A.S.
                </motion.span>
              </motion.div>
            </motion.a>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative px-3 py-1.5 font-sora text-sm font-light text-white/70 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                  {activeLink === link.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-px bg-azul rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            {/* ── Right cluster ── */}
            <div className="flex items-center gap-2">
              {/* Socials — hidden when scrolled to save space */}
              <AnimatePresence>
                {!scrolled && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hidden lg:flex items-center gap-0.5 overflow-hidden"
                  >
                    {socialLinks.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                      >
                        {s.icon}
                      </a>
                    ))}
                    <div className="w-px h-5 bg-white/15 mx-1" />
                  </motion.div>
                )}
              </AnimatePresence>

              <ThemeToggle className="text-white/60 hover:text-white hover:bg-white/10" />

              <div className="hidden lg:block">
                <LiquidMetalButton
                  label="Probar Ksmart360"
                  href="https://www.appjeylor.com/"
                  target="_blank"
                  width={scrolled ? 160 : 180}
                />
              </div>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={menuOpen}
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-5 h-0.5 bg-white rounded-full origin-center"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block w-5 h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-5 h-0.5 bg-white rounded-full origin-center"
                />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(13,15,22,0.92)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
            }}
          >
            <nav className="flex flex-col p-4 gap-0.5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="font-sora text-white/80 hover:text-white text-sm font-light py-3 px-4 rounded-xl hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-3 px-4 pb-2 flex flex-col gap-3">
                <div className="flex justify-center">
                  <LiquidMetalButton
                    label="Probar Ksmart360"
                    href="https://www.appjeylor.com/"
                    target="_blank"
                    width={200}
                  />
                </div>
                <div className="flex justify-center gap-3 pt-1">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
