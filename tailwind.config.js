/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      abc:["IBM-Plex-Mono", "monospace"],
    },
    colors:{
      'skygreen': '#1CABA2',
      'gray': '#C0C0C0',
      'FF': '#F8F8F8'
    },

  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}

