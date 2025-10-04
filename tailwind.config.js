/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'temple-maroon': '#8B0000',
        'temple-crimson': '#DC143C',
        'temple-gold': '#FFD700',
        'temple-orange': '#FFA500',
      },
    },
  },
  plugins: [],
}
