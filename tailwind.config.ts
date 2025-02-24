import type { Config } from "tailwindcss";
import { heroui } from "@heroui/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/util/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(accordion|autocomplete|avatar|breadcrumbs|button|card|checkbox|divider|dropdown|form|input|kbd|link|modal|navbar|pagination|radio|select|skeleton|spinner|toggle|table|tabs|toast|popover|user|ripple|listbox|scroll-shadow|menu|spacer).js"
  ],
  theme: {
    extend: {
      fontSize: {
        xss: "0.5rem",
      },
      colors: {
        DEFAULT: "#2563eb",
        dark: "#0a0a0a",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        davidLibre: ["David Libre", "serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        dividerWeight: "3px",
      },
    }),
    heroui(),
  ],
};
export default config;
