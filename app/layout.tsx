import type { Metadata } from "next";
import type { LayoutProps } from "@/types";
import { CartProvider } from "@/context/cart-context";
import MenuProvider from "@/context/menu-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "SNEAKERFIT",
};

function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <MenuProvider>
          <CartProvider>{children}</CartProvider>
        </MenuProvider>
      </body>
    </html>
  );
}

export default RootLayout;
