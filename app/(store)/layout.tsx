import type { Metadata } from "next";
import { CartProvider } from "@/context/cart-context";
import MenuProvider from "@/context/menu-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sneakerfit store",
};

interface LayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: LayoutProps) {
  return (
    <MenuProvider>
      <CartProvider>{children}</CartProvider>
    </MenuProvider>
  );
}

export default RootLayout;
