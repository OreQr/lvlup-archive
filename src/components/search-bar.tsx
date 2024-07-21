import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SearchBar({
  defaultCategory,
  categories,
}: {
  defaultCategory?: number
  categories: { id: number; slug: string; name: string; color: string }[]
}) {
  const handleChange = (categoryId: string) => {
    const category = categories.find(
      (category) => category.id.toString() === categoryId
    )

    window.location.pathname = `/c/${category.slug}/${category.id}`
  }

  return (
    <Select
      onValueChange={handleChange}
      defaultValue={defaultCategory?.toString()}
    >
      <SelectTrigger className="min-w-[180px] mb-2">
        <SelectValue placeholder="Wybierz kategorie" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem
            key={category.id}
            value={category.id.toString()}
            className="cursor-pointer"
          >
            <div className="flex items-center space-x-1">
              <div
                className="min-h-[8px] min-w-[8px]"
                style={{ backgroundColor: `#${category.color}` }}
              />
              <span>{category.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
