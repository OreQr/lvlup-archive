import "dotenv/config"

import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import robotsTxt from "astro-robots-txt"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: process.env.APP_URL,
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => {
        const segments = page.split("/").filter((e) => e !== "")

        return segments.length === 5 || segments.length === 2
      },
    }),
    robotsTxt({
      policy: [{ allow: "/", userAgent: "*" }],
    }),
  ],
})
