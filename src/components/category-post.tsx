import * as React from "react"
import type { Post } from "@/types"

export function CategoryPostContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return <ul className="divide-y divide-border">{children}</ul>
}

export const CategoryPost = React.forwardRef<
  HTMLLIElement,
  { post: Post; children: React.ReactNode }
>(({ post, children }, ref) => (
  <li ref={ref}>
    <div className="py-4">
      <a href={`/t/${post.slug}/${post.topic_id}`}>
        <div className="flex justify-between">
          <div className="pr-2 sm:pr-4">
            <h3 className="text-base font-semibold tracking-tight">
              {post.title}
            </h3>
          </div>
          {children}
        </div>
      </a>
    </div>
  </li>
))
