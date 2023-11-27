import { Post, User } from "@/types"
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
