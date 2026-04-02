/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          l: '#F0D98A',
          d: '#7A5C10',
          dark: '#8B6914',
        },
        crimson: {
          DEFAULT: '#9B1F35',
          l: '#D4304A',
          d: '#5A0F1E',
          dark: '#5A0F1E',
        },
        dark: {
          DEFAULT: '#07050A',
          2: '#0F0C14',
          3: '#16121E',
          4: '#1E1828',
          5: '#251F30',
        },
        text: '#EDE0D4',
        dim: {
          DEFAULT: '#9A8880',
          2: '#6A5A52',
        },
        white: '#FBF6F0',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        bebas: ['var(--font-bebas)', 'Bebas Neue', 'cursive'],
        playfair: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F0D98A, #C9A84C, #7A5C10)',
        'crimson-gradient': 'linear-gradient(135deg, #9B1F35, #5A0F1E)',
      },
      animation: {
        'orb-float': 'orbf 14s ease-in-out infinite',
        'logo-pulse': 'logopulse 4s ease-in-out infinite',
        'scroll-bounce': 'scb 2.2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
      },
      keyframes: {
        orbf: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '33%': { transform: 'translate(25px, -18px)' },
          '66%': { transform: 'translate(-18px, 25px)' },
        },
        logopulse: {
          '0%, 100%': { boxShadow: '0 0 50px rgba(155,31,53,0.22), 0 0 100px rgba(201,168,76,0.07)' },
          '50%': { boxShadow: '0 0 70px rgba(155,31,53,0.38), 0 0 140px rgba(201,168,76,0.11)' },
        },
        scb: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%': { transform: 'translateX(-50%) translateY(5px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
