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
  Home,
  Package,
  ShoppingBag,
  Store,
  UserPen,
  Users,
} from "lucide-react";
import Image from "next/image";

export function DashboardSidebar() {
  const placeholderAvatar =
    "https://twftinvtkstgcriamblf.supabase.co/storage/v1/object/public/placeholders/placeholderAvatar.jpg";

  return (
    <Sidebar className="border-card">
      <SidebarHeader className="bg-background py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex h-fit">
              <div className="bg-primary relative overflow-hidden size-10 rounded-lg">
                <Image
                  className="object-contain"
                  src={placeholderAvatar}
                  alt="User avatar"
                  fill
                />
              </div>

              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium capitalize">usuário</span>
                <span className="text-foreground/50">email@email.com</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarMenu className="space-y-2">
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
