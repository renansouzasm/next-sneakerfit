"use client";

import type React from "react";
import { ContextWrapper } from "./_context/ContextWrapper";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StoreSidebar } from "./_components/store-sidebar";
import { ThemeToggleButton } from "@/components/theme-toggle-button";

interface StoreLayoutProps {
  children: React.ReactNode;
}

export default function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <ContextWrapper>
      <SidebarProvider defaultOpen={false}>
        <div className="flex min-h-screen w-full">
          <StoreSidebar />

          <main className="flex-1">
            <div className="flex flex-col">
              <header className="sticky top-0 z-50 flex justify-between h-16 items-center gap-4 bg-background px-6">
                <SidebarTrigger className="cursor-pointer" />

                <ThemeToggleButton />
              </header>

              <div className="flex-1 p-6">{children}</div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ContextWrapper>
  );
}
