import Image from "next/image"
import type { User } from "@/types"
import { AvatarProps } from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

interface UserAvatarProps extends AvatarProps {
  user: User
  width?: number
  height?: number
}

export function UserAvatar({
  user,
  width = 32,
  height = 32,
  ...props
}: UserAvatarProps) {
  return (
    <Avatar
      {...props}
      className={cn(
        user.username === "system" && "rounded-none",
        props.className
      )}
    >
      {user.avatar ? (
        <Image alt="avatar" width={width} height={height} src={user.avatar} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.username}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
