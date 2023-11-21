import "@/styles/mdx.css"
import { getPost, getPostsMetadata } from "@/lib/posts"
import { Separator } from "@/components/ui/separator"
import Markdown from "@/components/markdown"
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
      <div>
        <h1 className="scroll-m-20 font-heading text-3xl">
          {post.fancy_title ? post.fancy_title : post.title}
        </h1>
        <UserProfile user={post.user} />
      </div>
      <article>
        <Markdown>{post.raw}</Markdown>
      </article>
      <Separator />
      <div className="space-y-4">
        {post.comments.map((comment) => (
          <div className="space-y-2" key={comment.id}>
            <UserProfile user={comment.user} />
            <div>
              <Markdown>{comment.raw}</Markdown>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  )
}
