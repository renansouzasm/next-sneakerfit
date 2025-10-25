import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StaticImageData } from "next/image";

interface ProductThumbProps {
  thumb?: string | StaticImageData | null;
}

export function ProductThumb({ thumb }: ProductThumbProps) {
  const placeholderThumb = "/placeholderThumb.jpg";

  return (
    <Avatar className="bg-card/50 rounded-lg h-16 w-16">
      <AvatarImage
        className="object-contain"
        src={String(thumb) ?? placeholderThumb}
      />
      <AvatarFallback className="rounded-lg">PH</AvatarFallback>
    </Avatar>
  );
}
