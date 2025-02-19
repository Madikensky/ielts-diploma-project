import type { Config } from "tailwindcss";
import { theme } from "antd";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        textCommon: "#C95559",
        textWhite: "#fff",
        textBlack: "#000",
        textCorrectAnswer: "#389E48",
        textWrongAnswer: "#EB2930",
      },
      backgroundColor: {
        bgCommonShadowed: "#96393C",
        bgCommon: "#C95559",
        bgWhite: "#fff",
        bgBlack: "#000",
        bgCommonLight: "#E9777B",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  // corePlugins: {
  //   preflight: false,
  // },
} satisfies Config;
