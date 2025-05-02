import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [theme, setThemeState] = useState<
    "theme-light" | "dark" | "system" | null
  >(null)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setThemeState(isDarkMode ? "dark" : "theme-light")
  }, [])

  useEffect(() => {
    if (theme !== null) {
      const isDark =
        theme === "dark" ||
        (theme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      document.documentElement.classList[isDark ? "add" : "remove"]("dark")
    }
  }, [theme])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() =>
        setThemeState(theme === "theme-light" ? "dark" : "theme-light")
      }
    >
      <Sun className="h-6 w-[1.3rem] dark:hidden" />
      <Moon className="hidden size-5 dark:block" />
      <span className="sr-only">Przełącz motyw</span>
    </Button>
  )
}
