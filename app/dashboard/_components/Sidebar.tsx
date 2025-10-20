"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  UserCircle as UserTie,
  PieChart,
  CheckSquare,
  Bell,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import user from "@/public/user.png";

const menuItems = [
  { href: "/dashboard/", icon: BarChart3, label: "Dashboard" },
  { href: "/dashboard/products", icon: Package, label: "Produtos", badge: 12 },
  { href: "/dashboard/orders", icon: ShoppingCart, label: "Pedidos", badge: 3 },
  { href: "/dashboard/customers", icon: Users, label: "Clientes" },
  { href: "/dashboard/employees", icon: UserTie, label: "Funcionários" },
  { href: "/dashboard/tasks", icon: CheckSquare, label: "Tarefas", badge: 5 },
  { href: "/dashboard/analytics", icon: PieChart, label: "Análises" },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full w-full lg:w-[284px] flex-shrink-0 bg-background">
      <ScrollArea className="flex-1">
        <div className="flex flex-col px-6 py-8">
          {/* {onClose && (
            <div className="flex justify-end mb-4 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                <X className="h-4 w-4" /> d
              </Button>
            </div>
          )} */}

          {/* User Section */}
          <div className="flex flex-col pb-6">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-12 w-12 ring-2 ring-border ring-offset-2 ring-offset-background">
                <AvatarImage
                  src={user.src || "/placeholder.svg"}
                  alt="Admin"
                  className="object-cover"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="text-foreground font-semibold text-sm truncate">
                  Admin
                </div>
                <div className="text-muted-foreground text-xs truncate">
                  admin@sneakerhub.com
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange rounded-full" />
              </button>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-transform duration-200",
                      isActive && "text-orange",
                      !isActive && "group-hover:scale-110"
                    )}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        "h-5 min-w-5 px-1.5 text-xs font-semibold",
                        isActive
                          ? "bg-orange text-white"
                          : "bg-secondary text-muted-foreground group-hover:bg-accent group-hover:text-foreground"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </ScrollArea>
    </div>
  );
}
