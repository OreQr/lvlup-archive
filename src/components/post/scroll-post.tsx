import { useEffect } from "react"

export default function ScrollPost() {
  useEffect(() => {
    const hash = (() => {
      const url = location.href
      const hashIndex = url.indexOf("#")
      if (hashIndex !== -1) {
        let endIndex = url.indexOf("?", hashIndex)
        if (endIndex === -1) {
          endIndex = url.indexOf("/", hashIndex)
        }
        return endIndex !== -1
          ? url.substring(hashIndex + 1, endIndex)
          : url.substring(hashIndex + 1)
      }
      return null
    })()

    const postNumber = parseInt(hash)
    if (!postNumber) return

    const element = document.getElementById(`post-${postNumber}`)
    if (!element) return

    element.scrollIntoView()
    window.scrollBy(
      0,
      -4 * parseFloat(getComputedStyle(document.documentElement).fontSize)
    )

    element.classList.add("animate-highlight")
  }, [])

  return null
}
