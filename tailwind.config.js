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
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
    },
  },
  plugins: [],
};
