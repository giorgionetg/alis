import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}", // tutti i file che contengono classi tailwind
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        eur42: ["EUR42", "serif"], // deve combaciare col font-family del tuo @font-face
        rubik: ["Rubik", "serif"], // idem
      },
    },
  },
  plugins: [],
};

export default config;
