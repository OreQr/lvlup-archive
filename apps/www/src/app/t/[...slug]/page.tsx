import "@/styles/mdx.css"
import { getPost, getPostsMetadata } from "@/lib/posts"
import Markdown from "@/components/markdown"

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
    <div className="py-6">
      <Markdown>{post.raw}</Markdown>
    </div>
  )
}
