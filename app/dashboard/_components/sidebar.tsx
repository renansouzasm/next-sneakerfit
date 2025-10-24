import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  ChartPie,
  ClipboardList,
  GalleryVerticalEnd,
  Home,
  Package,
  ShoppingBag,
  Store,
  UserPen,
  Users,
} from "lucide-react";

export function DashboardSidebar() {
  return (
    <Sidebar className="border-card">
      <SidebarHeader className="bg-background">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={"#"}>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>

                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">usuário</span>
                  <span>email@email.com</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href={"/dashboard"}>
                <SidebarMenuButton className="flex items-center text-md font-semibold tracking-wider cursor-pointer gap-4">
                  <Home /> Home
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href={"/dashboard/orders"}>
                <SidebarMenuButton className="flex items-center text-md font-semibold tracking-wider cursor-pointer gap-4">
                  <ShoppingBag /> Pedidos
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href={"/dashboard/products"}>
                <SidebarMenuButton className="flex items-center text-md font-semibold tracking-wider cursor-pointer gap-4">
                  <Package /> Produtos
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href={"/dashboard/customers"}>
                <SidebarMenuButton className="flex items-center text-md font-semibold tracking-wider cursor-pointer gap-4">
                  <Users /> Clientes
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href={"#"}>
                <SidebarMenuButton className="flex items-center text-md font-semibold tracking-wider cursor-pointer gap-4">
                  <UserPen /> Funcionários
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href={"#"}>
                <SidebarMenuButton className="flex items-center text-md font-semibold tracking-wider cursor-pointer gap-4">
                  <ClipboardList /> Tarefas
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href={"#"}>
                <SidebarMenuButton className="flex items-center text-md font-semibold tracking-wider cursor-pointer gap-4">
                  <ChartPie /> Análises
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href={"/"}>
                <SidebarMenuButton className="flex items-center text-md font-semibold tracking-wider cursor-pointer gap-4">
                  <Store /> Loja
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
