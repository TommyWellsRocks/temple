import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        thePurple: "rgb(103, 56, 255)",
        divider: "rgba(255, 255, 255, 0.25)",
        secondaryBackground: "rgb(56, 64, 70)",
        secondaryBackgroundLighter: "(56, 64, 70, 0.3)",
        doneBlack: "rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
} satisfies Config;
