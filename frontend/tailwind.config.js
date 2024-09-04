/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {backgroundImage: {
      'doctor': "url('./public/assets/doctor-u.jpg')",
      'appoinment' : "url('./assets/appoinment.png')",   
    },},
    keyframes: {
      'bounce-up-down': {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' },
      },
    },
    animation: {
      'bounce-up-down': 'bounce-up-down 2s infinite',
    },
  },
  plugins: [],
}

