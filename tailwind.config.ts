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
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        buttonPrimary: "var(--buttonPrimary)",
        buttonPrimaryHover: "var(--buttonPrimaryHover)",
        buttonSecondary: "var(--buttonSecondary)",
        buttonSecondaryHover: "var(--buttonSecondaryHover)"
      },
      fontFamily: {
        title: ['var(--font-playfair)', 'serif'], // Using the CSS variable for Playfair Display
        body: ['var(--font-opensans)', 'sans-serif'], // Using the CSS variable for Open Sans
      },
    },
  },
  plugins: [],
};
export default config;
