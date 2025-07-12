/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campusYellow: "#FFCB05", // Official UMich Maize
        campusBlue: "#00274C", // Official UMich Blue
        campusNavy: "#1a1a1a", // Dark text
        campusBee: "#FFB300", // Warm accent
        campusGray: "#f8f9fa", // Light backgrounds
      },
    },
  },
  plugins: [],
};
