import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0D9488",
        dark: "#0F172A",
        navy: {
          DEFAULT: "#1e3a5f",
          light: "#2a4f7c",
          dark: "#152d4a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
