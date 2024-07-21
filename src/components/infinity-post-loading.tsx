import { useCallback, useEffect, useRef, useState } from "react"
import ky from "ky"

import DateTime from "@/components/date-time"

import { CategoryPost, CategoryPostContainer } from "./category-post"
import { Icons } from "./icons"

export default function InfinityPostLoading({
  categoryId,
}: {
  categoryId: number
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadedPosts, setLoadedPosts] = useState<any[]>([])
  const [hasMore, setHasMore] = useState<boolean>(false)

  const [page, setPage] = useState<number>(1)

  const loadMorePosts = async () => {
    setIsLoading(true)

    const data = (await ky
      .get(`/api/category/${categoryId}/${page}.json`)
      .json()) as { posts: any; hasMore: boolean }

    setLoadedPosts((prevPosts) => [...prevPosts, ...data.posts])
    setHasMore(data.hasMore)
    setPage((prevPage) => prevPage + 1)

    setIsLoading(false)
  }

  const observer = useRef<IntersectionObserver | null>(null)
  const lastPostElementRef = useCallback(
    (node: Element) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts()
        }
      })

      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore]
  )

  useEffect(() => {
    loadMorePosts()
  }, [])

  return (
    <>
      <CategoryPostContainer>
        {loadedPosts.map((post, index) => (
          <CategoryPost
            key={post.topic_id}
            ref={loadedPosts.length === index + 1 ? lastPostElementRef : null}
            post={post}
          >
            <DateTime time={post.created_at} mode="short" />
          </CategoryPost>
        ))}
      </CategoryPostContainer>
      {isLoading && (
        <div className="flex justify-center mt-4">
          <Icons.spinner className="animate-spin" />
        </div>
      )}
    </>
  )
}
