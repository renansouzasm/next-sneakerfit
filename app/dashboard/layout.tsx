"use client";

import type React from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { ContextWrapper } from "./_context/ContextWrapper";
import { ThemeToggleButton } from "@/components/theme-toggle-button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ContextWrapper>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />

          <main className="flex-1">
            <div className="flex flex-col">
              <header className="sticky top-0 z-10 flex justify-between h-16 items-center gap-4 border-b border-border bg-background px-6">
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
