export function formatDate(
  date: Date | number,
  mode: "short" | "full"
): string {
  const timeMs = typeof date === "number" ? date : date.getTime()

  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000)

  const cutoffs = [60, 3600, 86400, 86400 * 30, 86400 * 365, Infinity]

  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "month",
    "year",
  ]

  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds)
  )

  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1

  const rtf = new Intl.RelativeTimeFormat("pl", {
    numeric: "auto",
    style: mode === "full" ? "long" : "short",
  })

  const result = rtf.format(
    Math.floor(deltaSeconds / divisor),
    units[unitIndex]
  )

  return mode === "full"
    ? result
    : result
        .split(" ")
        .slice(0, -1)
        .join("")
        .replace(".", "")
        .replace("dni", "d")
}
