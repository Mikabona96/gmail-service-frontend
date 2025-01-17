import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      creamWhite: "#FAFAFB",
      black: "#17171E",
      divider: "#272730",
      lightGrey: "#92929D",
      darkGrey: "#1C1C24",
      grey: "#292932",
      blue: "#1E75FF",
      red: "#FC5A5A",
      orange: "#FF974A",
      yellow: "#FEBD2F",
      purple: "#C43C5D",
      green: "#79D861",
    },
  },
  plugins: [],
};
export default config;
