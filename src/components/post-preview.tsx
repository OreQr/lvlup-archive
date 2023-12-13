import Link from "next/link"
import type { PostMetadata } from "@/types"
import Gradient from "javascript-color-gradient"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"

import DateTime from "./date-time"
import PostFooter from "./post-footer"
import { UserAvatar } from "./user-avatar"

export default function PostPreview({ metadata }: { metadata: PostMetadata }) {
  const commentsColor = (midpoint = 5) => {
    const comments = metadata.comments

    const colorIndex = Math.round((midpoint * comments) / 10)

    const gradient = new Gradient()
      .setColorGradient("#71717a", "#fe7a15")
      .setMidpoint(midpoint)
      .getColor(colorIndex === 0 ? 0.01 : colorIndex)

    return gradient
  }

  return (
    <Link href={`/t/${metadata.slug}/${metadata.topicId}`}>
      <Card className="flex items-center justify-between">
        <div className="flex items-center">
          <UserAvatar
            title={metadata.user.username}
            user={metadata.user}
            width={250}
            height={250}
            className="ml-6"
          />
          <CardHeader>
            <CardTitle className="text-base">{metadata.title}</CardTitle>
            <PostFooter metadata={metadata} />
          </CardHeader>
        </div>
        <div className="flex flex-col items-end pr-6">
          <span
            className="font-medium"
            style={{
              color: commentsColor(),
            }}
          >
            {metadata.comments}
          </span>
          <DateTime time={metadata.createdAt} mode="short" />
        </div>
      </Card>
    </Link>
  )
}
