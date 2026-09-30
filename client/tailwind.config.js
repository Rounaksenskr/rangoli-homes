/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF8F5",
        beige: {
          50: "#FBF9F6",
          100: "#F4F0EA",
          200: "#E8E2D8",
          300: "#D6CCA8",
        },
        charcoal: {
          900: "#1A1A1A",
          800: "#2B2B2B",
          700: "#3D3D3D",
        },
        gold: {
          500: "#C5A880",
          600: "#B09265",
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
