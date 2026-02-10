import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function AvatarWithBadge(props: React.ComponentPropsWithoutRef<typeof Avatar>) {
  return (
    <Avatar {...props}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>
  )
}
