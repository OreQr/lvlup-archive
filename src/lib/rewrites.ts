export const rewriteURL = (text: string, base: string, newBase: string) => {
  if (!text) return text

  const regex1 = new RegExp(`(${base}\/t\/\\d+)`, "g")
  const regex2 = new RegExp(`(${base}\/t\/[a-zA-Z0-9_\\-]+\/\\d+)`, "g")

  const replaceURLs = (match: string) => {
    return match.replace(base, newBase)
  }

  const newText = text.replace(regex1, replaceURLs).replace(regex2, replaceURLs)

  return newText
}
