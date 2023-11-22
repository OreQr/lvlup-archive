import fs from "fs"
import type { Post, PostMetadata } from "@/types"

const folder = "content/"

export const getPost = (topicId: number): Post => {
  const post = JSON.parse(
    fs.readFileSync(folder + `${topicId}.json`).toString()
  ) as Post

  return post
}

export const getPosts = (): string[] => {
  const files = fs.readdirSync(folder)

  const posts = files
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .reverse()

  return posts
}

export const getPostsMetadata = (
  start?: number,
  end?: number
): PostMetadata[] => {
  const posts = getPosts().slice(start, end)

  const postPreviews: PostMetadata[] = posts.map((postFile) => {
    const post = getPost(Number(postFile.split(".")[0]))

    return {
      id: post.id,
      topicId: post.topic_id,
      user: post.user,
      title: post.title,
      slug: post.slug,
      tags: post.tags,
      categoryId: post.category_id,
      comments: post.comments.length,
      createdAt: new Date(post.created_at),
    }
  })

  return postPreviews
}
