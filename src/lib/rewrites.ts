export const rewriteURL = (text: string, base: string, newBase: string) => {
  if (!text) return text

  const postIdURL = new RegExp(`(${base}/t/\\d+/(\\d+)/?(\\d+)?)`, "g")
  const postSlugURL = new RegExp(
    `(${base}/t/[a-zA-Z0-9_\\-]+/(\\d+)/?(\\d+)?)`,
    "g"
  )

  const rawURL = new RegExp(`(${base}\/raw\/\\d+\/?)`, "g")

  const replaceURLs = (match: string) => {
    const newMatch = match.replace(base, newBase)

    if (match.split("/").filter((e) => e !== "").length === 6) {
      const commendId = newMatch
        .split("/")
        .filter((e) => e !== "")
        .pop()

      return newMatch.slice(0, -commendId.length) + "#" + commendId
    }

    return newMatch
  }

  const replaceRawURLs = (match: string) => {
    return (
      match
        .replace(base, newBase)
        .split("/")
        .filter((e) => e !== "")
        .join("/") + ".json"
    )
  }

  const newText = text
    .replace(rawURL, replaceRawURLs)
    .replace(postSlugURL, replaceURLs)
    .replace(postIdURL, replaceURLs)

  return newText
}
