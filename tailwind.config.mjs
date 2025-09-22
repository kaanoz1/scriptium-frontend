const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/util/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(accordion|autocomplete|avatar|breadcrumbs|button|card|checkbox|divider|dropdown|form|input|kbd|link|modal|navbar|number-input|pagination|radio|select|skeleton|slider|spinner|toggle|table|tabs|toast|popover|user|ripple|listbox|scroll-shadow|menu|spacer).js",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0a0a0a",
      },
      fontSize: {
        xss: "0.5rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        davidLibre: ["David Libre", "serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
