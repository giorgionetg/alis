// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";


import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://alismardare.it',
  integrations: [
    react(),
    sitemap(),
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          allow: "/",          // consenti tutto
          disallow: ["/admin", "/login", "/api"], // blocca aree sensibili
        },
      ],
      sitemap: "https://alismardare.it/sitemap-index.xml", // link automatico
      host: "https://alismardare.it",
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});