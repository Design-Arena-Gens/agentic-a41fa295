import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "tech-blue": "#1f4fff",
        "space-purple": "#6f00b5"
      }
    }
  },
  plugins: []
};

export default config;
