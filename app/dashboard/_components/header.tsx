"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="layout-size flex py-4 items-center justify-between">
        <SidebarTrigger className="text-foreground bg-card cursor-pointer" />
      </div>
    </header>
  );
}
