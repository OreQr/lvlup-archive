import { Presets, SingleBar } from "cli-progress"

import { postToRaw } from "@/lib/markdown"
import { posts } from "@/lib/posts"
import { site } from "@/lib/site"

const progress = new SingleBar({}, Presets.shades_classic)

const indexContent = async () => {
  const { createIndex, close } = await import("pagefind")
  const { index } = await createIndex({})
  if (!index) return

  progress.start(posts.length, 0)
  for (const post of posts) {
    const content = await postToRaw(post)

    const category = site.categories.find(
      (category) => category.id === post.category_id
    )!

    await index.addCustomRecord({
      url: `/t/${post.slug}/${post.topic_id}`,
      content,
      meta: {
        title: post.fancy_title ? post.fancy_title : post.title,
        category: category.name,
      },
      filters: {
        tags: post.tags,
      },
      language: "pl",
    })
    progress.increment()
  }

  await index.writeFiles({
    outputPath: "public/pagefind",
  })
  await close()

  progress.stop()
}

indexContent()
