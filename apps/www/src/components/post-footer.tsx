import { getSite } from "@/lib/site"

interface PostFooter {
  metadata: {
    categoryId: number
    tags: string[]
  }
}

export default function PostFooter({ metadata }: PostFooter) {
  const site = getSite()
  const category = site.categories.find(
    (category) => category.id === metadata.categoryId
  )!

  return (
    <div className="flex flex-wrap items-center gap-x-4 text-sm text-muted-foreground">
      <div className="flex items-center space-x-1">
        <div
          className="min-h-[8px] min-w-[8px]"
          style={{ backgroundColor: `#${category.color}` }}
        />
        <span>{category.name}</span>
      </div>
      <span>{metadata.tags.join(", ")}</span>
    </div>
  )
}
