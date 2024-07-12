/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'my-image':"url(/public/interface.svg)"
      }
    },
    fontFamily:{
      abc:["IBM-Plex-Mono", "monospace"],
    },
    colors:{
      'skygreen': '#1CABA2',
      'gray': '#C0C0C0',
      'FF': '#F8F8F8',
      'BG': '#F4F4F4',
      'white': '#FFFFFF'
    },

  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}

