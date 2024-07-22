/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js, jsx}",
    "./src/components/*.{js, jsx}"
],
  theme: {
    extend: {
        colors: {
            "boba": "#aa69ff",
            "kiki": "#ebba07",
            "fresh": "#2e8fff",
            "smelly": "#707514",
            "sleepy": "#3c00b5",
            "amped": "#ff4800"
        }
    },
  },
  plugins: [],
}

