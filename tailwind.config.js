/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
  './utility/**/*.{js,ts,jsx,tsx,mdx}' // <--- THIS IS THE LINE I ADDED TO MY CONFIG TO INCLUDE MY FILE
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

