/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        chado: ['ChaDo', 'sans-serif'],
      },
      colors: {
        customBlack: '#232323',
        customOrange: '#f05f05',
      },
    },
  },
  plugins: [],
}

