"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type MenuContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

interface LayoutProps {
  children: React.ReactNode;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const MenuProvider = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const value = {
    isMenuOpen,
    setIsMenuOpen,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export default MenuProvider;

export function useMobileMenu() {
  const context = useContext(MenuContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
