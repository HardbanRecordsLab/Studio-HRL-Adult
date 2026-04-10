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
        // Unified color system
        primary: {
          DEFAULT: '#C9A84C',
          50: '#F0D98A',
          100: '#E5CC7A',
          200: '#D4B86A',
          300: '#C9A84C',
          400: '#B8953A',
          500: '#9B7F2A',
          600: '#7A5C10',
          700: '#5A4408',
          800: '#3A2C05',
          900: '#1A1402',
        },
        accent: {
          DEFAULT: '#9B1F35',
          50: '#D4304A',
          100: '#C02040',
          200: '#A81835',
          300: '#9B1F35',
          400: '#8A1A30',
          500: '#6B1525',
          600: '#5A0F1E',
          700: '#3A0A14',
          800: '#1A050A',
          900: '#0A0205',
        },
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        dark: {
          DEFAULT: '#07050A',
          50: '#0F0C14',
          100: '#16121E',
          200: '#1E1828',
          300: '#251F30',
          400: '#2D2538',
          500: '#352B40',
        },
        // Legacy color aliases for backward compatibility
        gold: '#C9A84C',
        crimson: '#9B1F35',
        text: '#EDE0D4',
        dim: '#9A8880',
        white: '#FBF6F0',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        bebas: ['var(--font-bebas)', 'Bebas Neue', 'cursive'],
        playfair: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #F0D98A, #C9A84C, #7A5C10)',
        'accent-gradient': 'linear-gradient(135deg, #D4304A, #9B1F35, #5A0F1E)',
        'dark-gradient': 'linear-gradient(135deg, #0F172A, #07050A, #020617)',
        // Legacy aliases
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
