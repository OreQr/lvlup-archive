import { getPostsMetadata } from "@/lib/posts"
import PostPreview from "@/components/post-preview"

export default function HomePage() {
  const postsMetadata = getPostsMetadata()

  return (
    <div className="flex flex-col space-y-2 py-6">
      {postsMetadata.map((postMetadata) => (
        <PostPreview key={postMetadata.id} metadata={postMetadata} />
      ))}
    </div>
  )
}
