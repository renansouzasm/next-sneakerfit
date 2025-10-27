"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

const menuItems = [
  {
    title: "Destaque",
    url: "#hero",
  },
  {
    title: "Coleção",
    url: "#collection",
  },
  {
    title: "Rodapé",
    url: "#footer",
  },
  {
    title: "Login",
    url: "/login",
  },
  {
    title: "Cadastro",
    url: "/signup",
  },
  {
    title: "Dashboard",
    url: "/dashboard",
  },
];

export function StoreSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarContent className="bg-background p-8 flex flex-col justify-between">
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <span className="uppercase tracking-wider font-semibold text-lg">
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>

        <SidebarFooter>
          <Link
            href={"https://www.linkedin.com/in/renansouzasm"}
            target="_blank"
          >
            <Button className="cursor-pointer" variant="link">
              <Linkedin /> LinkedIn
            </Button>
          </Link>
          <Link href={"https://github.com/renansouzasm"} target="_blank">
            <Button className="cursor-pointer" variant="link">
              <Github /> GitHub
            </Button>
          </Link>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
