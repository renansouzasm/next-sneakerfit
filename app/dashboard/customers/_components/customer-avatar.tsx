import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StaticImageData } from "next/image";

interface CustomerAvatarProps {
  avatarUrl?: string | StaticImageData | null;
}

export function CustomerAvatar({ avatarUrl }: CustomerAvatarProps) {
  const placeholderAvatar = "/placeholderAvatar.jpg";

  return (
    <Avatar>
      <AvatarImage src={String(avatarUrl) ?? placeholderAvatar} />
      <AvatarFallback>AV</AvatarFallback>
    </Avatar>
  );
}
