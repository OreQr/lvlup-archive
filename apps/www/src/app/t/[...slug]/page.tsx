import "@/styles/mdx.css"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { Post } from "@/types"

import { siteConfig } from "@/config/site"
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

const getPostFromParams = ({ params }: PostPageProps) => {
  const short = !isNaN(Number(params.slug[0])) && !params.slug[1]

  let post: Post
  try {
    post = getPost(short ? Number(params.slug[0]) : Number(params.slug[1]))
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return notFound()
    } else {
      throw new Error(error)
    }
  }

  if (!short && params.slug[0] !== post.slug) return notFound()
  if (short) return redirect(`/t/${post.slug}/${post.topic_id}`)
  return post
}

export const generateMetadata = ({ params }: PostPageProps): Metadata => {
  const post = getPostFromParams({ params })

  const title = post.fancy_title ? post.fancy_title : post.title
  const description = siteConfig.description

  const ogImages = post.image ? [{ url: post.image }] : undefined

  return {
    metadataBase: new URL(process.env.APP_URL!),
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/t/${post.slug}/${post.topic_id}`,
      publishedTime: post.created_at,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: siteConfig.description,
      images: ogImages,
    },
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostFromParams({ params })

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
