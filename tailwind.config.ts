import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF9F6",
        pearl: "#F5F5F5",
        platinum: "#ECECEC",
        graphite: "#111111",
        silver: "#D9D9D9",
        champagne: "#D6C3A5"
      },
      fontFamily: {
        display: ["Didot", "Bodoni 72", "Bodoni Moda", "Playfair Display", "Georgia", "serif"],
        sans: ["General Sans", "Satoshi", "Inter", "Arial", "sans-serif"]
      },
      boxShadow: {
        pearl: "0 28px 90px rgba(17, 17, 17, 0.08)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.82), 0 24px 80px rgba(17,17,17,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
