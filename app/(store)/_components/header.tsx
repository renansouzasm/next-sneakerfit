"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CartDrawer } from "./cart-drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const placeholderAvatar =
    "https://twftinvtkstgcriamblf.supabase.co/storage/v1/object/public/placeholders/placeholderAvatar.jpg";

  return (
    <header className="bg-background sticky top-0 z-50">
      <div className="layout-size flex py-4 items-center justify-between">
        <SidebarTrigger className="text-foreground bg-card cursor-pointer" />

        <div className="flex gap-4 items-center">
          <CartDrawer />

          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src={placeholderAvatar} />
            <AvatarFallback className="h-10 w-10 rounded-lg">PH</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
