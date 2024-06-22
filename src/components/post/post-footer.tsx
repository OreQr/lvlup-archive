import { site } from "@/lib/site"

interface PostFooter {
  category_id: number
  tags: string[]
}

export default function PostFooter({ category_id, tags }: PostFooter) {
  const category = site.categories.find(
    (category) => category.id === category_id
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
      <span>{tags.join(", ")}</span>
    </div>
  )
}
