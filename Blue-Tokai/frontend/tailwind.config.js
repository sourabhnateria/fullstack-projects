/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: "#FBF7F4",
          100: "#F3E9E1",
          200: "#E4CCB8",
          300: "#D1A883",
          400: "#B47F52",
          500: "#8B5E34",
          600: "#6F4A2A",
          700: "#573923",
          800: "#3D281A",
          900: "#241811",
        },
        ink: "#1F1B16",
        mulberry: "#7B2D42",
        paper: "#F6F1E7",
        stamp: "#C1440E",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "Cambria", "serif"],
      },
    },
  },
  plugins: [],
};
