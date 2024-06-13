import "server-only"

import fs from "fs"

import type { Site } from "@/types/generated/site"

export const getSite = () => {
  const file = fs.readFileSync("public/site.json").toString()

  const site = JSON.parse(file) as Site

  return site
}
