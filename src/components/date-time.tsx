import { formatDate } from "@/lib/date"

export default function DateTime({
  time,
  mode = "full",
}: {
  time: Date | number | string
  mode?: "full" | "short"
}) {
  const date = new Date(time)

  return (
    <span
      title={date.toLocaleString("pl")}
      className="text-sm text-muted-foreground break-keep"
    >
      {formatDate(date, mode)}
    </span>
  )
}
