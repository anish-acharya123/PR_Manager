/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)",
      },
      animation: {
        pulse: "pulse 2s infinite ease-in-out",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: 0.3 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
