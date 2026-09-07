import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warmOffWhite: '#F5F4F1',
        softStone: '#E9E8E4',
        deepBlack: '#111111',
        charcoal: '#191A1A',
        electricBlue: '#2F6BFF',
        brand: {
          warmOffWhite: '#F5F4F1',
          softStone: '#E9E8E4',
          deepBlack: '#111111',
          charcoal: '#191A1A',
          electricBlue: '#2F6BFF',
          lightAccent: '#F0F0F0',
        }
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(400px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(400px)', opacity: '0' },
        },
        shrinkWidth: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        slideUp: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-out-right': 'slideOutRight 0.4s ease-in forwards',
        'shrink-width': 'shrinkWidth 4s linear forwards',
      },
    }
  },
  plugins: [],
};

export default config;
