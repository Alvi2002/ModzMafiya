/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // ডার্ক মোড এনাবল করার জন্য
  theme: {
    extend: {
      colors: {
        primary: "#00df82", // ওই সাইটের সবুজ কালার
        secondary: "#1db954",
        darkBg: "#0b0f1a", // ব্যাকগ্রাউন্ডের ডার্ক কালার
        cardBg: "#161b29", // কার্ডের ব্যাকগ্রাউন্ড কালার
        borderGray: "#242936",
      },
    },
  },
  plugins: [],
}
