"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CartDrawer } from "./cart-drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="bg-zinc-950 sticky top-0 z-50">
      <div className="layout-size flex py-4 items-center justify-between">
        <SidebarTrigger className="hover:bg-zinc-900 h-10 w-10 cursor-pointer hover:text-primary transition-colors">
          <Menu />
        </SidebarTrigger>

        <div className="flex gap-4 items-center">
          <CartDrawer />

          <Avatar className="h-10 w-10">
            <AvatarImage src={true && "/placeholderAvatar.jpg"} />
            <AvatarFallback>PH</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
