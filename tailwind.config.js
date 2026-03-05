/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        f1red: '#e10600',
        f1dark: '#0f0f0f',
        f1gray: '#1a1a1a',
        f1card: '#1e1e1e',
        f1border: '#2a2a2a',
        f1muted: '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

