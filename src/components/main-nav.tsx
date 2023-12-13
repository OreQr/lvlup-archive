import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { NavItem } from "@/types"

import { cn } from "@/lib/utils"

import { Icons } from "./icons"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/">
        <div className="hidden items-end space-x-2 sm:flex">
          <Image
            src="/static/logo.png"
            width={170}
            height={40}
            alt="logo"
            className="h-10"
          />
          <span className="font-mono font-medium leading-none">Archiwum</span>
        </div>
        <div className="flex items-end space-x-2 sm:hidden">
          <Icons.logo />
          <span className="font-mono font-medium leading-none">Archiwum</span>
        </div>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
