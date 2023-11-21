import { PostMetadata } from "@/types"

import { getPosts, getPostsMetadata } from "@/lib/posts"
import Pagination from "@/components/pagination"
import PostPreview from "@/components/post-preview"

const PER_PAGE = 20
const pagesCount = Math.ceil(getPosts().length / PER_PAGE)

export const generateStaticParams = () => {
  const pages = Array.from({ length: pagesCount }, (_, index) => index + 1)

  return pages.map((page) => ({
    page: page.toString(),
  }))
}

export default function HomePage({ params }: { params: { page: string } }) {
  const page = Number(params.page)

  const start = (page - 1) * PER_PAGE
  const end = start + PER_PAGE

  const postsMetadata: PostMetadata[] = getPostsMetadata(start, end)

  return (
    <div className="flex flex-col space-y-4 py-6">
      <div className="flex flex-col space-y-2">
        {postsMetadata.map((postMetadata) => (
          <PostPreview key={postMetadata.id} metadata={postMetadata} />
        ))}
      </div>
      <Pagination page={page} pages={pagesCount} />
    </div>
  )
}
