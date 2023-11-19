import fs from "fs"
import Link from "next/link"
import { Post } from "@/types"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"

interface PostPreview {
  id: number
  topicId: number
  title: string
  slug: string
}

const getPostsMetadata = () => {
  const folder = "content/"
  const files = fs.readdirSync(folder)
  const posts = files
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .reverse()
    .slice(0, 10)

  const postPreviews: PostPreview[] = posts.map((postFile) => {
    const post = JSON.parse(
      fs.readFileSync(folder + postFile).toString()
    ) as Post

    return {
      id: post.id,
      topicId: post.topic_id,
      title: post.title,
      slug: post.slug,
    }
  })

  return postPreviews
}

export default function HomePage() {
  const postsMetadata = getPostsMetadata()

  return (
    <div className="flex flex-col space-y-2 py-6">
      {postsMetadata.map((postMetadata) => (
        <Link
          key={postMetadata.id}
          href={`/t/${postMetadata.slug}/${postMetadata.topicId}`}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{postMetadata.title}</CardTitle>
              {/* <CardDescription></CardDescription> */}
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
