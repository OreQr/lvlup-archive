"use client"

import { useEffect } from "react"

export default function ScrollPost({ post_number }: { post_number?: number }) {
  useEffect(() => {
    if (!post_number) return
    const number = isNaN(post_number) ? undefined : post_number

    const element = document.getElementById(`post-${number}`)
    if (!element) return

    element.scrollIntoView()
    window.scrollBy(
      0,
      -4 * parseFloat(getComputedStyle(document.documentElement).fontSize)
    )

    element.classList.add("animate-highlight")
  }, [post_number])

  return <></>
}
