import "server-only"
import fs from "fs"
import { cache } from "react"

import type { Site } from "@/types/generated/site"

export const getSite = cache(() => {
  const file = fs.readFileSync("public/site.json").toString()

  const site = JSON.parse(file) as Site

  return site
})
