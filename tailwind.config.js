/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        card: '#18181b', // zinc-900
        primary: '#ffffff',
        secondary: '#a1a1aa', // zinc-400
        accent: {
          DEFAULT: '#ec4899', // pink-500
          fuchsia: '#d946ef', // fuchsia-500
        },
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

