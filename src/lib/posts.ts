import fs from "fs"
import type { Post } from "@/types"

const folder = "content/"

export const getPosts = (): Post[] => {
  const files = fs.readdirSync(folder)

  const postsFiles = files
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .reverse()

  const posts: Post[] = postsFiles.map((postFile) => {
    const post = JSON.parse(
      fs.readFileSync(folder + postFile).toString()
    ) as Post

    return post
  })

  return posts
}
