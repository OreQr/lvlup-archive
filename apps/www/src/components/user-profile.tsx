import type { User } from "@/types"

import { UserAvatar } from "./user-avatar"

export default function UserProfile({ user }: { user: User }) {
  return (
    <div className="flex items-center space-x-2">
      <UserAvatar user={user} width={250} height={250} />
      <div title={user.name}>
        <span className="font-semibold">{user.username}</span>{" "}
        <span className="text-sm text-muted-foreground">{user.title}</span>
      </div>
    </div>
  )
}
