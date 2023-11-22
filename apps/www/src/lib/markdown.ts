import { Post, User } from "@/types"
import { remark } from "remark"
import strip from "strip-markdown"

import { bbcodeToRaw } from "./bbcode"

interface RawPost {
  raw: string
  user: User
  created_at: string
}

export const postToRaw = async (post: Post) => {
  const rawPost = async (post: RawPost) => {
    const stripMarkdown = bbcodeToRaw(
      String(await remark().use(strip).process(post.raw))
    )

    return `${post.user.username}${
      post.user.title && " " + post.user.title
    } ${new Date(post.created_at).toLocaleString()}\n\n${stripMarkdown}\n\n\n`
  }

  let raw: string = ""
  raw += post.fancy_title ? post.fancy_title : post.title
  raw += await rawPost(post)

  for (const comment of post.comments) {
    raw += await rawPost(comment)
  }

  return raw
}
