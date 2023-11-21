import Link from "next/link"
import type { PostMetadata } from "@/types"
import Gradient from "javascript-color-gradient"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import "moment/locale/pl"
import moment from "moment"

import { getSite } from "@/lib/site"

import { UserAvatar } from "./user-avatar"

moment.updateLocale("pl", {
  relativeTime: {
    s: "s",
    m: "min",
    mm: "%dmin",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1m",
    MM: "%dm",
    y: "rok",
    yy: "%dlat",
  },
})

export default function PostPreview({ metadata }: { metadata: PostMetadata }) {
  const site = getSite()
  const category = site.categories.find(
    (category) => category.id === metadata.categoryId
  )!

  const commentsColor = (midpoint = 20) => {
    const comments = metadata.comments

    const colorIndex = Math.round((midpoint * comments) / 10)

    const gradient = new Gradient()
      .setColorGradient("#08080b", "#93c55e")
      .setMidpoint(midpoint)
      .getColor(colorIndex === 0 ? 0.01 : colorIndex)

    return gradient
  }

  return (
    <Link href={`/t/${metadata.slug}/${metadata.topicId}`}>
      <Card className="flex items-center justify-between">
        <div className="flex items-center">
          <UserAvatar
            user={metadata.user}
            width={250}
            height={250}
            className="ml-6"
          />
          <CardHeader>
            <CardTitle className="text-base">{metadata.title}</CardTitle>
            <div className="flex flex-wrap items-center gap-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div
                  className="h-2 w-2"
                  style={{ backgroundColor: `#${category.color}` }}
                />
                <span>{category.name}</span>
              </div>
              <span>{metadata.tags.join(", ")}</span>
            </div>
          </CardHeader>
        </div>
        <div className="flex flex-col items-end p-6">
          <span
            className="font-medium"
            style={{
              color: commentsColor(),
            }}
          >
            {metadata.comments}
          </span>
          <span className="text-sm text-muted-foreground">
            {moment(metadata.createdAt).fromNow(true)}
          </span>
        </div>
      </Card>
    </Link>
  )
}
