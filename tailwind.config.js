/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //custom colors
        primary: "#FF3636",
        secondary: "#0D0E0E",
        borderColor: "#333333",
        secondary_gray: "#1F1F1F",
        form_bg: "rgba(13, 14, 14, 0.97)",
      },
      screens: {
        md: "868px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
