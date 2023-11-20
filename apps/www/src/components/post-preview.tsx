import Link from "next/link"
import type { PostMetadata } from "@/types"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function PostPreview({ metadata }: { metadata: PostMetadata }) {
  return (
    <Link href={`/t/${metadata.slug}/${metadata.topicId}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{metadata.title}</CardTitle>
          {/* <CardDescription></CardDescription> */}
        </CardHeader>
      </Card>
    </Link>
  )
}
