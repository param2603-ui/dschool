import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#f7fbff",
        accent: "#f5b700",
        "text-primary": "#0f172a",
        "text-secondary": "#475569",
      },
    },
  },
  plugins: [],
};
export default config;