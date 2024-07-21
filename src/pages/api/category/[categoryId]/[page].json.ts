import type { APIRoute } from "astro"
import pick from "lodash/pick"

import { posts } from "@/lib/posts"

export const GET: APIRoute = ({ params }) => {
  const categoryId = parseInt(params.categoryId)
  const page = parseInt(params.page)

  const filteredPosts = posts.filter((post) => post.category_id === categoryId)

  const paginatedPosts = filteredPosts.slice(
    page * import.meta.env.MAX_CATEGORY_POSTS,
    (page + 1) * import.meta.env.MAX_CATEGORY_POSTS
  )

  const hasMore =
    (page + 1) * import.meta.env.MAX_CATEGORY_POSTS < filteredPosts.length

  return new Response(
    JSON.stringify({
      posts: paginatedPosts.map((post) =>
        pick(post, ["topic_id", "title", "slug", "created_at"])
      ),
      hasMore,
    }),
    { headers: { "Content-Type": "application/json" } }
  )
}

export function getStaticPaths() {
  const paths = []

  const categories = [...new Set(posts.map((post) => post.category_id))]

  categories.forEach((categoryId) => {
    const totalPostsInCategory = posts.filter(
      (post) => post.category_id === categoryId
    ).length
    const totalPages = Math.ceil(
      totalPostsInCategory / import.meta.env.MAX_CATEGORY_POSTS
    )

    for (let page = 0; page < totalPages; page++) {
      paths.push({
        params: { categoryId: categoryId.toString(), page: page.toString() },
      })
    }
  })

  return paths
}
