"use client";

import Link from "next/link";
import { ShoppingBag, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cart-context";
import { useMobileMenu } from "@/context/menu-context";
import CartModal from "./cart-modal";
import MobileMenu from "./mobile-menu";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();
  const { isMenuOpen, setIsMenuOpen } = useMobileMenu();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950 shadow-md">
        <div className="px-4 py-4 lg:px-32 flex items-center justify-between">
          <h1 className="text-2xl font-bold header-font">SNEAKERFIT</h1>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li className="uppercase text-sm font-medium">
                <Link href="/" className="hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li className="uppercase text-sm font-medium">
                <Link href="#" className="hover:text-primary">
                  Categorias
                </Link>
              </li>
              <li className="uppercase text-sm font-medium">
                <Link href="#" className="hover:text-primary">
                  Coleção
                </Link>
              </li>
              <li className="uppercase text-sm font-medium">
                <Link href="#" className="hover:text-primary">
                  Promoções
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="#" className="relative" aria-label="User account">
              <User size={20} />
            </Link>

            <button
              className="relative cursor-pointer"
              aria-label="Shopping cart"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden"
              aria-label="Menu"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && <MobileMenu />}

      <div className="pt-16"></div>

      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Header;
