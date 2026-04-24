import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          coral: "#ef7f6d",
          mustard: "#f6c351",
          sky: "#68b7f3",
          mint: "#88d7b5",
          lavender: "#b79be8",
          cream: "#fff9f2",
          ink: "#263238",
          teal: "#6fd4cf"
        }
      },
      boxShadow: {
        soft: "0 20px 45px -30px rgba(18, 40, 46, 0.45)",
        card: "0 18px 40px -28px rgba(17, 45, 58, 0.42)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at 20% 25%, rgba(246,195,81,0.35), transparent 45%), radial-gradient(circle at 85% 15%, rgba(104,183,243,0.35), transparent 40%)"
      }
    }
  },
  plugins: []
};

export default config;
