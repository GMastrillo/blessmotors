import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bless: {
          obsidian: "#070709",
          carbon: "#111115",
          surface: "#18181D",
          red: {
            DEFAULT: "#DC2626",
            light: "#EF4444",
            dark: "#991B1B",
          },
          gold: {
            DEFAULT: "#D4AF37",
            light: "#EAB308",
            dark: "#A16207",
          },
          steel: {
            DEFAULT: "#9CA3AF",
            light: "#E5E7EB",
            dark: "#374151",
          },
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "Syne", "sans-serif"],
        editorial: ["var(--font-cinzel)", "Cinzel", "serif"],
        sans: ["var(--font-geist-sans)", "Geist", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        super: "0.28em",
        ultra: "0.35em",
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "pulse-subtle": "pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
