"use client";

import type React from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-background w-full h-screen overflow-hidden flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="bg-card hover:bg-accent text-white border border-border"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="p-0 w-[280px] bg-background border-border"
          >
            <Sidebar onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-8 py-8 lg:px-8 md:px-6 sm:px-5 max-sm:px-5 max-sm:py-6 max-sm:pt-16">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
}
