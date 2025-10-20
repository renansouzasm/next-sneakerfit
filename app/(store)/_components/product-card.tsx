"use client";

import { ShoppingBag, Heart } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import sneaker8 from "@/public/sneakers-thumbs/sneaker-1.png";
import { formatCurrencyBrl } from "@/utils/formatCurrencyBrl";
import { Product } from "@/app.types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <article className="group">
      <div className="mb-4 overflow-hidden">
        <Image
          src={product.imageUrl ?? sneaker8}
          alt={product.name}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h3 className="font-medium text-center capitalize">{product.name}</h3>

      <p className="text-center text-text-light">
        {formatCurrencyBrl(product.price)}
      </p>

      <div className="flex justify-center gap-4 mt-4">
        <button
          className="bg-zinc-800 p-2 rounded-full cursor-pointer"
          aria-label="Add to favorites"
        >
          <Heart size={20} />
        </button>

        <button
          className="bg-zinc-800 p-2 rounded-full cursor-pointer"
          aria-label="Add to cart"
          onClick={() => addToCart(product)}
        >
          <ShoppingBag size={20} />
        </button>
      </div>
    </article>
  );
}
