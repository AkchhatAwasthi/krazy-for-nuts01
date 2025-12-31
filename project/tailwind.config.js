/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'times': ['Times New Roman', 'Times', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'dancing': ['Dancing Script', 'cursive'],
      },
      colors: {
        beige: {
          50: '#FEFDFB',
          100: '#FAF8F3',
          200: '#F5F0E8',
          300: '#EDE5D6',
          400: '#E3D7C4',
          500: '#D6C7B0',
          600: '#C4B299',
          700: '#B09D82',
          800: '#8B7A65',
          900: '#6B5D4F'
        },
        gold: {
          50: '#FFFDF7',
          100: '#FEF9E7',
          200: '#FDF2C7',
          300: '#FCE96A',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12'
        },
        brown: {
          50: '#FDFCFB',
          100: '#F7F3F0',
          200: '#F0E6DD',
          300: '#E5D3C8',
          400: '#D6BFB0',
          500: '#C4A484',
          600: '#A67C52',
          700: '#8B5A3C',
          800: '#744C32',
          900: '#5D3E2A'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};