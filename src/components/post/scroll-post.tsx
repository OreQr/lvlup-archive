import { useEffect } from "react"

export default function ScrollPost() {
  useEffect(() => {
    const url = window.location.href
    const hashIndex = url.indexOf("#")
    const queryIndex = url.indexOf("?")

    const hash =
      hashIndex !== -1 && (queryIndex === -1 || hashIndex < queryIndex)
        ? url.substring(
            hashIndex + 1,
            queryIndex === -1 ? url.length : queryIndex
          )
        : undefined

    const postNumber = hash
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
