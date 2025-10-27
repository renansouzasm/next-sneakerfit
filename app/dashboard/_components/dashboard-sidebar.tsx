"use client";

import {
  Package2,
  ShoppingBag,
  Users,
  UserCircle,
  ClipboardList,
  ShoppingCart,
  Home,
  Store,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";

const menuItems = [
  {
    title: "Home",
    icon: Home,
    url: "/dashboard",
  },
  {
    title: "Produtos",
    icon: ShoppingBag,
    url: "/dashboard/products",
  },
  {
    title: "Funcionários",
    icon: Users,
    url: "/dashboard/employees",
  },
  {
    title: "Clientes",
    icon: UserCircle,
    url: "/dashboard/customers",
  },
  {
    title: "Tarefas",
    icon: ClipboardList,
    url: "/dashboard/tasks",
  },
  {
    title: "Pedidos",
    icon: ShoppingCart,
    url: "/dashboard/orders",
  },
  {
    title: "Loja",
    icon: Store,
    url: "/",
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Package2 className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Usuário</span>
            <span className="text-xs text-sidebar-foreground/60">
              exemplo@email.com
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
