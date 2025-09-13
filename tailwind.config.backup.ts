import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
};

export default config;
