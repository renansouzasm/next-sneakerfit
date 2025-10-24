import { Header } from "./_components/header";
import { DashboardSidebar } from "./_components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { DashboardContextWrapper } from "./_context/DashboardContextWrapper";

interface DashboardLayout {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayout) {
  return (
    <DashboardContextWrapper>
      <SidebarProvider>
        <DashboardSidebar />

        <SidebarInset>
          <Header />

          {children}
        </SidebarInset>

        <Toaster position="top-center" />
      </SidebarProvider>
    </DashboardContextWrapper>
  );
}
