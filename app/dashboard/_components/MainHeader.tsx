"use client";

import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import user from "@/public/user.png";
import Link from "next/link";

interface MainHeaderProps {
  title: string;
  showAvatars?: boolean;
  showAddButton?: boolean;
  url?: string;
}

export default function MainHeader({
  title,
  showAvatars = true,
  showAddButton = true,
  url,
}: MainHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold text-white">{title}</h1>

        {showAvatars && (
          <div className="flex items-center -space-x-2 max-sm:hidden">
            <Avatar className="h-9 w-9 border-2 border-[#0e0e0e] ring-1 ring-[#252424]">
              <AvatarImage
                src={user.src || "/placeholder.svg"}
                alt="Team member"
                className="object-cover"
              />
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <Avatar className="h-9 w-9 border-2 border-[#0e0e0e] ring-1 ring-[#252424]">
              <AvatarImage
                src={user.src || "/placeholder.svg"}
                alt="Team member"
                className="object-cover"
              />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <Avatar className="h-9 w-9 border-2 border-[#0e0e0e] ring-1 ring-[#252424]">
              <AvatarImage
                src={user.src || "/placeholder.svg"}
                alt="Team member"
                className="object-cover"
              />
              <AvatarFallback>U3</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full border-2 border-dashed border-[#252424] text-[#5c5c5c] hover:text-white hover:border-[#3a3a3a] hover:bg-[#151515]"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {showAddButton && (
        <Button
          className="bg-orange hover:bg-orange/90 text-white shadow-lg shadow-orange/20 transition-all duration-200 hover:shadow-orange/30"
          size="icon"
        >
          <Link
            href={url ? url : `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`}
          >
            <Plus className="h-5 w-5" />
          </Link>
        </Button>
      )}
    </div>
  );
}
