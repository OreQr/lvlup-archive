import { MetadataRoute } from "next"

import { getPostsMetadata } from "@/lib/posts"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPostsMetadata()

  return posts.map((post) => ({
    url: new URL(`/t/${post.slug}/${post.topicId}`, process.env.APP_URL).href,
  }))
}
