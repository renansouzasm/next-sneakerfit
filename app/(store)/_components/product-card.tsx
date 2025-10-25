"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onFavoriteToggle?: (productId: string, isFavorite: boolean) => void;
  className?: string;
}

export function ProductCard({
  product,
  onFavoriteToggle,
  className,
}: ProductCardProps) {
  const placeholderThumb =
    "https://twftinvtkstgcriamblf.supabase.co/storage/v1/object/public/placeholders/placeholderThumb.jpg";
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    onFavoriteToggle?.(product.id, newFavoriteState);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card/25 border border-card transition-all duration-300",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <Image
          src={product.thumbUrl || placeholderThumb}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          fill
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2 p-4">
        <h3 className="text-balance text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>

      {/* Hover Overlay Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-transparent transition-all duration-300 group-hover:ring-primary/20" />
    </div>
  );
}
