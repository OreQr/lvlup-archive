"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react"

import { Button } from "./ui/button"

interface PaginationProps {
  page: number
  pages: number
}

export default function Pagination({ page, pages }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handlePageChange = (newPage: number) => {
    if (newPage === 1) return router.push(pathname)
    router.push(`${pathname}?page=${newPage}`)
  }

  return (
    <div className="flex items-center justify-end space-x-6 px-2 lg:space-x-8">
      <div className="flex items-center justify-center text-sm font-medium">
        Strona {page} z {pages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
        >
          <span className="sr-only">Przejdź do pierwszej strony</span>
          <ChevronsLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <span className="sr-only">Przejdź do poprzedniej strony</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pages}
        >
          <span className="sr-only">Przejdź do następnej strony</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => handlePageChange(pages)}
          disabled={page === pages}
        >
          <span className="sr-only">Przejdź do ostatniej strony</span>
          <ChevronsRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
