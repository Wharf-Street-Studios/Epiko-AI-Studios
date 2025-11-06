/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lex-green': '#00ff88',
        'spring-yellow': '#ffee44',
        'spring-pink': '#ff88cc',
        'spring-blue': '#66ddff',
        'spring-orange': '#ffaa44',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '24px',
      },
    },
  },
  plugins: [],
}
