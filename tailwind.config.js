/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['var(--font-sora)', 'Sora', 'sans-serif'],
        display: ['var(--font-display)', 'Sora', 'sans-serif'],
        mono: ['var(--font-jetbrains)', '"JetBrains Mono"', 'monospace'],
      },
      colors: {
        grafito: '#16181F',
        azul: '#2E68E6',
        azulStack: '#2E68E6',
        violeta: '#7C3AED',
        acero: 'var(--text-muted)',
        tinte: 'var(--surface-tinte)',
        azulTinte: 'var(--surface-tinte)',
        papel: 'var(--surface-base)',
        falcon: {
          ink: '#050A14',
          navy: '#0B1B2E',
          deep: '#1D3E5E',
          cyan: '#22D3EE',
          teal: '#14B8A6',
          sky: '#38BDF8',
          alert: '#F43F5E',
          amber: '#F59E0B',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        'spin-slow': 'spin 18s linear infinite',
        'ping-slow': 'ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite',
        'radar': 'radar 4s linear infinite',
        'marquee-rev': 'marquee-rev 36s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        radar: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'marquee-rev': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
    },
  },
  plugins: [],
};
