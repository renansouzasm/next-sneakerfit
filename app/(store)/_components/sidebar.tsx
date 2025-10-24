import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function StoreSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarContent className="bg-background px-4 py-4">
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            <SidebarMenuItem>
              <SidebarMenuButton
                className="hover:bg-transparent hover:text-primary py-5 font-bold text-2xl cursor-pointer uppercase tracking-widest"
                asChild
              >
                <Link href={"/"}>Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="hover:bg-transparent hover:text-primary py-5 font-bold text-2xl cursor-pointer uppercase tracking-widest"
                asChild
              >
                <Link href={"/login"}>Login</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="hover:bg-transparent hover:text-primary py-5 font-bold text-2xl cursor-pointer uppercase tracking-widest"
                asChild
              >
                <Link href={"/signup"}>Cadastro</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="hover:bg-transparent hover:text-primary py-5 font-bold text-2xl cursor-pointer uppercase tracking-widest"
                asChild
              >
                <Link href={"#"}>Carrinho</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="hover:bg-transparent hover:text-primary py-5 font-bold text-2xl cursor-pointer uppercase tracking-widest"
                asChild
              >
                <Link href={"/dashboard"}>Dashboard</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-background px-4 py-8">
        <div className="space-y-2">
          <Link
            className="flex items-center gap-4 text-xs tracking-widestr"
            href="https://www.linkedin.com/in/renansouzasm"
            target="_blank"
          >
            <Linkedin /> LinkedIn
          </Link>
          <Link
            className="flex items-center gap-4 text-xs tracking-widestr"
            href="https://github.com/renansouzasm"
            target="_blank"
          >
            <Github /> GitHub
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
