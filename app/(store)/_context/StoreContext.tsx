"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import type { Product } from "@prisma/client";
import { getProductsAction } from "@/app/dashboard/products/_actions/product-actions";
import { displayErrorToast } from "@/utils/displayToast";

export interface CartItem extends Product {
  quantity: number;
}

interface ContextProps {
  children: ReactNode;
}

interface StoreContextType {
  products: Product[];
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: ContextProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts(): Promise<void> {
      setLoading(true);
      setError(null);
      const response = await getProductsAction();

      if (!response.data) {
        setError(String(response.error));
        displayErrorToast(String(response.error));
      } else {
        setProducts(response.data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  function addToCart(product: Product) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId: string) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }

  function updateItemQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        cartItems,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error(
      "useStoreContext deve ser usado dentro de um StoreProvider"
    );
  }
  return context;
}
