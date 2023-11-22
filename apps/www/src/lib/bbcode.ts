export const bbcodeToMarkdown = (bbcode: string): string => {
  if (!bbcode) return bbcode

  let markdown = bbcode

  // Bold
  markdown = markdown.replace(/\[b\](.*?)\[\/b\]/g, "**$1**")

  // Emphasis
  markdown = markdown.replace(/\[i\](.*?)\[\/i\]/g, "*$1*")

  // Strikethrough
  markdown = markdown.replace(/\[s\](.*?)\[\/s\]/g, "~~$1~~")

  // Image
  markdown = markdown.replace(/\[img\](.*?)\[\/img\]/g, "![]($1)")

  // URL
  markdown = markdown.replace(/\[url\](.*?)\[\/url\]/g, "$1")

  // Quote
  markdown = markdown.replace(
    /\[quote="([^"]+)"\]([\s\S]*?)\[\/quote\]/g,
    (match, author: string, content: string) => {
      const formattedAuthor = author.split(",").shift()
      const formattedContent = content.trim()
      return `>${formattedAuthor}:\n>\n>${formattedContent}`
    }
  )

  return markdown
}

export const bbcodeToRaw = (bbcode: string): string => {
  if (!bbcode) return bbcode

  let markdown = bbcode

  // Bold
  markdown = markdown.replace(/\[b\](.*?)\[\/b\]/g, "$1")

  // Emphasis
  markdown = markdown.replace(/\[i\](.*?)\[\/i\]/g, "$1")

  // Strikethrough
  markdown = markdown.replace(/\[s\](.*?)\[\/s\]/g, "$1")

  // Image
  markdown = markdown.replace(/\[img\](.*?)\[\/img\]/g, "$1")

  // URL
  markdown = markdown.replace(/\[url\](.*?)\[\/url\]/g, "$1")

  // Quote
  markdown = markdown.replace(
    /\[quote="([^"]+)"\]([\s\S]*?)\[\/quote\]/g,
    (match, author: string, content: string) => {
      const formattedAuthor = author.split(",").shift()
      const formattedContent = content.trim()
      return `${formattedAuthor}:\n\n${formattedContent}`
    }
  )

  return markdown
}
