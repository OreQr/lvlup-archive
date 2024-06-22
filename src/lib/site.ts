import fs from "fs"

import type { Site } from "@/types/generated/site"

export const getSite = () => {
  const file = fs.readFileSync("public/site.json").toString()

  const site = JSON.parse(file) as Site

  return site
}

const globalForSite = globalThis as unknown as {
  site: Site | undefined
}

export const site = globalForSite.site ?? getSite()

if (process.env.NODE_ENV !== "production") globalForSite.site = site
