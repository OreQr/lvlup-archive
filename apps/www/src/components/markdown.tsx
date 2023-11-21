import { serialize } from "next-mdx-remote/serialize"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import emoji from "remark-emoji"
import remarkGfm from "remark-gfm"

import { bbcodeToMarkdown } from "@/lib/bbcode"

import { MdxContent } from "./mdx-content"

interface MarkdownProps {
  children: string
}

export default async function Markdown({ children }: MarkdownProps) {
  const source = bbcodeToMarkdown(children)

  const serialized = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, emoji],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypePrettyCode,
          {
            theme: "github-dark",
            onVisitLine(node: { children: string | any[] }) {
              // Prevent lines from collapsing in `display: grid` mode, and allow empty
              // lines to be copy/pasted
              if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }]
              }
            },
            onVisitHighlightedLine(node: {
              properties: { className: string[] }
            }) {
              node.properties.className.push("line--highlighted")
            },
            onVisitHighlightedWord(node: {
              properties: { className: string[] }
            }) {
              node.properties.className = ["word--highlighted"]
            },
          },
        ],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["subheading-anchor"],
              ariaLabel: "Link do sekcji",
            },
          },
        ],
      ],
      format: "md",
    },
  })

  return <MdxContent source={serialized} />
}
