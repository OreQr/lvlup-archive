import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { Presets, SingleBar } from "cli-progress"
import { close, createIndex } from "pagefind"

import { postToRaw } from "@/lib/markdown"
import { posts } from "@/lib/posts"
import { site } from "@/lib/site"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pagefindDir = path.join(__dirname, "../../public/pagefind")

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
        filters: {
          kategoria: [category.name],
        },
        language: "pl",
      })
      progress.increment()
    })
  )

  await index.writeFiles({
    outputPath: pagefindDir,
  })
  await close()

  progress.stop()
}

const cleanup = () => {
  if (fs.existsSync(pagefindDir)) {
    fs.rmSync(pagefindDir, { recursive: true, force: true })
  }
}

cleanup()
indexContent()
