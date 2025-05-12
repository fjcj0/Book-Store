/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        josefin: ['Josefin Sans', 'sans-serif'],
        slab: ['Josefin Slab', 'serif'],
        hachi: ['Hachi Maru Pop', 'cursive'],
        junga: ['Kanchenjunga', 'sans-serif'],
        mochiy: ['Mochiy Pop P One', 'sans-serif'],
      }
    },
  },
  plugins: [daisyui],
}