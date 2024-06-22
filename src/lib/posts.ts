import fs from "fs/promises"
import path from "path"
import type { Post } from "@/types"

const folder = "content/"

const getPosts = async (): Promise<Post[]> => {
  const files = await fs.readdir(folder)

  const postsFiles = files
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .reverse()

  const posts: Post[] = await Promise.all(
    postsFiles.map(async (postFile) => {
      const filePath = path.join(folder, postFile)
      const fileContents = await fs.readFile(filePath, "utf-8")
      const post = JSON.parse(fileContents) as Post
      return post
    })
  )

  return posts
}

const globalForPosts = globalThis as unknown as {
  posts: Post[] | undefined
}

export const posts = globalForPosts.posts ?? (await getPosts())

if (process.env.NODE_ENV !== "production") globalForPosts.posts = posts
