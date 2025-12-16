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
        primary: {
          DEFAULT: "hsl(var(--primary))", // Using HSL for primary color
          foreground: "hsl(var(--primary-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"], // Body font (placeholder for Satoshi)
        heading: ["var(--font-quicksand)"], // Heading font
      },
    },
  },
  plugins: [],
};
export default config;