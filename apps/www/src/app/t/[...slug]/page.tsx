import "@/styles/mdx.css"
import { getPost, getPostsMetadata } from "@/lib/posts"
import { Separator } from "@/components/ui/separator"
import DateTime from "@/components/date-time"
import Markdown from "@/components/markdown"
import PostFooter from "@/components/post-footer"
import UserProfile from "@/components/user-profile"

export const generateStaticParams = () => {
  const posts = getPostsMetadata()

  return posts.map((post) => ({
    slug: [post.slug, post.topicId.toString()],
  }))
}

interface PostPageProps {
  params: { slug: string[] }
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPost(Number(params.slug[1]))

  return (
    <div className="space-y-4 py-6">
      <div className="space-y-1.5">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-semibold">
              {post.fancy_title ? post.fancy_title : post.title}
            </h1>
            <PostFooter
              metadata={{ categoryId: post.category_id, tags: post.tags }}
            />
          </div>
          <div className="flex items-center justify-between">
            <UserProfile user={post.user} />
            <DateTime time={post.created_at} />
          </div>
        </div>
        <article>
          <Markdown>{post.raw}</Markdown>
        </article>
      </div>
      <div className="space-y-4">
        {post.comments.map((comment) => (
          <div className="space-y-4" key={comment.id}>
            <Separator />
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <UserProfile user={comment.user} />
                <DateTime time={comment.created_at} />
              </div>
              <div>
                <Markdown>{comment.raw}</Markdown>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
