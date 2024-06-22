import { Presets, SingleBar } from "cli-progress"
import { close, createIndex } from "pagefind"

import { postToRaw } from "@/lib/markdown"
import { posts } from "@/lib/posts"
import { site } from "@/lib/site"

const progress = new SingleBar({}, Presets.shades_classic)

const indexContent = async () => {
  const { index } = await createIndex({})

  progress.start(posts.length, 0)

  await Promise.all(
    posts.map(async (post) => {
      const content = await postToRaw(post)

      const category = site.categories.find(
        (category) => category.id === post.category_id
      )!

      await index.addCustomRecord({
        url: `/t/${post.slug}/${post.topic_id}`,
        content,
        meta: {
          title: post.fancy_title ? post.fancy_title : post.title,
          image: post.image || undefined,
          kategoria: category.name,
        },
        language: "pl",
      })
      progress.increment()
    })
  )

  await index.writeFiles({
    outputPath: "public/pagefind",
  })
  await close()

  progress.stop()
}

indexContent()
