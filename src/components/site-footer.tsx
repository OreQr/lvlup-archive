import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { ThemeToggle } from "./theme-toggle"

export default function SiteFooter({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Stworzone z ❤️ przez{" "}
            <a
              href="https://github.com/oreqr"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              OreQr
            </a>
            .
          </p>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  )
}
