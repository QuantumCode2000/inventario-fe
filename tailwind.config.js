/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
        boxShadow: {
          'right': '10px 0 10px -10px rgba(0, 0, 0, 0.75)',
        }
    },
  },
  plugins: [],
};
