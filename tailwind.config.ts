import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "primary-dark-gray": "#1f2937",
        "background-light-gray": "#f7f7f7",
        "code-editor-one-dark-pro": "#282c34",
        "highlight-dark": "#2f3e52",
        "disabled-dark": "#141a23",
        "custom-yellow": "#fcd34d",
        "middle-yellow": "#FDE594",
        "pale-yellow": "#faf6e9",
        "light-yellow": "#fef6db",
        "bright-yellow": "#ffff43",
        "dark-yellow": "#e5ddc5",
        mint: "#6fdcbf",
        "middle-mint": "#A9EAD9",
        "light-mint": "#e2f8f2",
        "mint-up": "#a5d4bb",
        "mint-down": "#55af96",
        "dark-mint": "#25a78b",
        lilac: "#ae8fdb",
        "middle-lilac": "#CFBCEA",
        "light-lilac": "#efe9f8",
        "deep-sea": "#2c96ae",
        sea: "#72cada",
        "middle-sea": "#ABDFE9",
        "light-sea": "#e3f4f8",
        "lilac-up": "#b1b1d8",
        sherbet: "#fef8b4",
        "mddle-sherbet": "#FFFACB",
        "light-sherbet": "#fffce1",
        "custom-pink": "#f7b8c2",
        "middle-pink": "#F7B8C2",
        "light-pink": "#fdf1f3",
        rose: "#dc849b",
        "middle-rose": "#EAB5C3",
        "light-rose": "#f8e6eb",
        marshmellow: "#d695b6",
        peach: "#f2c3c0",
        biscuit: "#ad998a",
        oat: "#cbc1bd",
        mid: "#cccccc",
        dark: "#404040",
        "dark-down": "#303145",
        tomato: "#ff6347",
        "middle-tomato": "#FFA291",
        "light-tomato": "#ffe0da",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mosk: ["mosk", ...fontFamily.sans],
        rubik: ["rubik", ...fontFamily.sans],
        firaCode: ["Fira Code", ...fontFamily.mono],
        cascadiaCode: ["Cascadia Code", ...fontFamily.mono],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    plugin(function ({ addVariant, addComponents, theme }) {
      addComponents({
        ".highlight-yellow": {
          background: `no-repeat center url(/svg/highlightSVG/yellow.svg)`,
          "background-size": "100% 100%",
          margin: "-2px -6px",
          padding: "2px  6px",
        },
        ".highlight-middle-tomato": {
          background: `no-repeat center url(/svg/highlightSVG/middle-tomato.svg)`,
          "background-size": "100% 100%",
          margin: "-2px -6px",
          padding: "2px  6px",
        },
        ".highlight-tomato": {
          background: `no-repeat center url(/svg/highlightSVG/tomato.svg)`,
          "background-size": "100% 100%",
          margin: "-2px -6px",
          padding: "2px  6px",
        },
        ".highlight-pink": {
          background: `no-repeat center url(/svg/highlightSVG/pink.svg)`,
          "background-size": "100% 100%",
          margin: "-2px -6px",
          padding: "2px  6px",
        },
        ".highlight-pink-audio": {
          background: `no-repeat center url(/svg/highlightSVG/pink.svg)`,
          "background-size": "100% 100%",
          // margin: "-2px -6px",
          // padding: "2px  6px",
        },
        ".highlight-dark-lilac": {
          background: `no-repeat center url(/svg/highlightSVG/dark-lilac.svg)`,
          "background-size": "100% 100%",
          margin: "-2px -6px",
          padding: "2px  6px",
        },
        ".highlight-lilac": {
          background: `no-repeat center url(/svg/highlightSVG/lilac.svg)`,
          "background-size": "100% 100%",
          margin: "-2px -6px",
          padding: "2px  6px",
        },
        ".highlight-light-lilac": {
          background: `no-repeat center url(/svg/highlightSVG/light-lilac.svg)`,
          "background-size": "100% 100%",
          margin: "-2px -6px",
          padding: "2px  6px",
        },
        ".highlight-mint": {
          background: `no-repeat center url(/svg/highlightSVG/mint.svg)`,
          "background-size": "100% 100%",
          margin: "-2px -6px",
          padding: "2px  6px",
        },
        ".highlight-mint-down": {
          background: `no-repeat center url(/svg/highlightSVG/mint-down.svg)`,
          "background-size": "100% 100%",
          margin: "-2px -6px",
          padding: "2px  6px",
        },
      });
    }),
  ],
} satisfies Config;

export default config;
