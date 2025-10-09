/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // FIX: Changed "./src//*.{js,jsx,ts,tsx}" 
    // to correctly include all files recursively within the src directory:
    "./src/**/*.{js,jsx,ts,tsx}", 
    
    // It's also often a good idea to include your main HTML file:
    "./index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}