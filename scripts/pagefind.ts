import fs from "fs"
import { Presets, SingleBar } from "cli-progress"

import type { Site } from "@/types/generated/site"
import { postToRaw } from "@/lib/markdown"
import { getPost, getPosts } from "@/lib/posts"

const getSite = () => {
  const file = fs.readFileSync("public/site.json").toString()

  const site = JSON.parse(file) as Site

  return site
}

const progress = new SingleBar({}, Presets.shades_classic)
const site = getSite()

const indexContent = async () => {
  const { createIndex, close } = await import("pagefind")
  const { index } = await createIndex({})
  if (!index) return

  const posts = getPosts()
  progress.start(posts.length, 0)
  for (const postFile of posts) {
    const post = getPost(Number(postFile.split(".")[0]))
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
