  // tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add this line to specify the paths to your source files
    "./public/index.html"          // Include your public folder if necessary
  ],
  theme: {
    extend: {
      colors: {
        bgColors: "#939185",
        primary: '#FF7777',
        secondary: '#FF6666',
        background: '#F7F7F7',
      }
    },
  },
  plugins: [],
};
