/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      screens: {
        'xl3': {'max': '1600px', 'min': '1290px'}, 
      },
    },
  },
  plugins: [],
}

