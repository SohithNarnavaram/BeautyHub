/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0A0B0D',
          card: '#1A1B1F',
          cardHover: '#242529',
          accent: '#8B5CF6',
          accentHover: '#A78BFA',
          accentAlt: '#06B6D4',
          border: '#2A2B2F',
          text: '#F9FAFB',
          textSecondary: '#9CA3AF',
        },
        pink: {
          bg: '#FEFBFD',
          card: '#FFFFFF',
          cardHover: '#F9F5F7',
          accent: '#EC4899',
          accentHover: '#F472B6',
          accentAlt: '#F43F5E',
          border: '#F3E8F0',
          text: '#1F2937',
          textSecondary: '#6B7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}

