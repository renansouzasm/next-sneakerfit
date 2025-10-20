import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "Sneakerfit dashboard",
  description: "Dashboard administrativo para loja de tênis",
};

interface LayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <Toaster className="bg-red-500" />
    </>
  );
}

export default RootLayout;
