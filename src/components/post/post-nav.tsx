import SharePost from "./share-post"

interface PostNavProps {
  post: { post_number: number }
}
export default function PostNav({ post }: PostNavProps) {
  return (
    <div className="flex items-center justify-end space-x-1 sm:space-x-2 mt-1">
      <SharePost post={post} />
    </div>
  )
}
