export const bbcodeToMarkdown = (bbcode: string): string => {
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
  markdown = markdown.replace(/\[quote="([^"]+)"\]\[\/quote\]/g, ">$1")

  return markdown
}
