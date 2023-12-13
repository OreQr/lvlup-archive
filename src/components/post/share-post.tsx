"use client"

import { useEffect, useState } from "react"
import { CopyIcon, LinkIcon } from "lucide-react"
import { CopyToClipboard } from "react-copy-to-clipboard"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from "../ui/button"

export default function SharePost({ post }: { post: { post_number: number } }) {
  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    setUrl(
      new URL(
        post.post_number !== 1
          ? location.pathname + `/${post.post_number}`
          : location.pathname,
        location.origin
      ).href
    )
  }, [post.post_number])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <LinkIcon className="h-5 w-5" />
          <span className="sr-only">Udostępnij</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Udostępnij post #{post.post_number}</DialogTitle>
          <DialogDescription>Udostępnij link do tego posta.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={url} readOnly />
          </div>
          <CopyToClipboard text={url}>
            <Button type="submit" size="sm" className="px-3">
              <CopyIcon className="h-4 w-4" />
              <span className="sr-only">Kopiuj</span>
            </Button>
          </CopyToClipboard>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Zamknij
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
