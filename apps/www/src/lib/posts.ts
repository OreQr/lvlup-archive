import fs from "fs"
import type { Post, PostMetadata } from "@/types"

const folder = "content/"

export const getPost = (topicId: number): Post => {
  const post = JSON.parse(
    fs.readFileSync(folder + `${topicId}.json`).toString()
  ) as Post

  return post
}

export const getPostsMetadata = () => {
  const files = fs.readdirSync(folder)
  const posts = files
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .reverse()
    .slice(0, 10)

  const postPreviews: PostMetadata[] = posts.map((postFile) => {
    const post = getPost(Number(postFile.split(".")[0]))

    return {
      id: post.id,
      topicId: post.topic_id,
      title: post.title,
      slug: post.slug,
    }
  })

  return postPreviews
}
