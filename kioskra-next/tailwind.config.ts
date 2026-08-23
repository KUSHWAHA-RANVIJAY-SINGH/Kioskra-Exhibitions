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
    }
  },
  plugins: [],
};

export default config;
