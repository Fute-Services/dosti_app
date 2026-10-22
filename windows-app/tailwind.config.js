/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        padauk: ["Padauk", "sans-serif"],
      },
      keyframes: {
        float2: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        float2: "float 3s ease-in-out infinite",
      },

    },
  },
  plugins: [],
}

