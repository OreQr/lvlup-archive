import { Post, User } from "@/types"
import * as cheerio from "cheerio"
import { remark } from "remark"
import strip from "strip-markdown"

import { bbcodeToRaw } from "./bbcode"

interface RawPost {
  raw: string
  user: User
  created_at: string
}

const stripMarkdown = async (raw: string) =>
  bbcodeToRaw(String(await remark().use(strip).process(raw)))

export const htmlImagesToMarkdown = (html: string): string => {
  if (!html) return html
  const $ = cheerio.load(html)

  $("img").each((index, element) => {
    const imgTag = $(element)
    const src = imgTag.attr("src")
    const alt = imgTag.attr("alt")
    const width = imgTag.attr("width")
    const height = imgTag.attr("height")

    const markdownImage = `![${alt || ""}${width || ""}${
      height && width && "x" + height
    }](${src})`
    imgTag.replaceWith(markdownImage)
  })

  return $.text()
}

export const getDescription = async (markdown: string, length = 160) => {
  const raw = await stripMarkdown(markdown)

  if (raw.length <= length) {
    return raw
  } else {
    return raw.substring(0, length - 3) + "..."
  }
}

export const postToRaw = async (post: Post) => {
  const rawPost = async (post: RawPost) => {
    const raw = await stripMarkdown(post.raw)

    return `${post.user.username}${
      post.user.title ? " " + post.user.title : ""
    } ${new Date(post.created_at).toLocaleString()}\n\n${raw}\n\n\n`
  }

  let raw: string = ""
  raw += post.fancy_title ? post.fancy_title : post.title
  raw += "\n" + (await rawPost(post))

  for (const comment of post.comments) {
    raw += await rawPost(comment)
  }

  return raw
}
