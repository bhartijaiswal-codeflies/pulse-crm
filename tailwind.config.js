/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: '#080D20',
          hover: '#131B38',
          active: '#2563EB',
          border: '#1E293B',
          text: '#FFFFFF',
          muted: '#8292AD',
        },
        brand: {
          sidebar: '#080D20',
          sidebarHover: '#131B38',
          active: '#2563EB',
          blue: '#3B82F6',
          bg: '#F7F9FC',
          card: '#FFFFFF',
          text: '#172033',
          muted: '#8292AD',
          border: '#E5EAF2',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          cyan: '#06b6d4'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'popover': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'card': '14px',
      }
    },
  },
  plugins: [],
}

