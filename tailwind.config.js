module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sora: ['var(--font-sora)', 'Sora', 'sans-serif'],
        mono: ['var(--font-jetbrains)', '"JetBrains Mono"', 'monospace'],
      },
      colors: {
        grafito: '#16181F', azul: '#2E68E6', azulStack: '#2E68E6',
        acero: '#6A6F7E', tinte: '#EAF0FE', azulTinte: '#EAF0FE', papel: '#FBFBFD',
      },
      animation: { float: 'float 6s ease-in-out infinite' },
      keyframes: { float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-16px)' } } },
    },
  },
  plugins: [],
};
