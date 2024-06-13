"use client"

import { useEffect, useState } from "react"
import debounce from "lodash.debounce"

import { Input } from "@/components/ui/input"

export default function Search() {
  const [pagefind, setPagefind] = useState<any | null>(null)
  const [searchResult, setSearchResult] = useState<any[]>([])

  useEffect(() => {
    const importPageFind = async () => {
      // @ts-ignore
      const pagefindModule = Function("x", "return import(x);")
      setPagefind(await pagefindModule("/pagefind/pagefind.js"))
    }

    importPageFind()
  }, [])

  const handleSearch = debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value

      if (pagefind) {
        const search = await pagefind.search(searchValue)

        const searchResults = await Promise.all(
          search.results
            .slice(0, search.results.length > 10 ? 10 : search.results.length)
            .map((result: any) => result.data())
        )

        setSearchResult(searchResults)
      }
    },
    200
  )

  return (
    <div className="space-y-2">
      <Input
        className="w-full sm:max-w-xs"
        placeholder="Szukaj..."
        type="text"
        onChange={handleSearch}
      />
      <ul className="ml-2 space-y-1">
        {searchResult.map((result, index) => (
          <li key={index} className="text-base font-semibold tracking-tight">
            <a href={result.url}>{result.meta.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
