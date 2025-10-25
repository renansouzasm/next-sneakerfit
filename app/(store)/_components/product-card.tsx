"use client";

import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatCurrencyBrl } from "@/utils/formatCurrencyBrl";
import { useStoreContext } from "../_context/StoreContext";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const placeholderThumb =
    "https://twftinvtkstgcriamblf.supabase.co/storage/v1/object/public/placeholders/placeholderThumb.jpg";
  const { addToCart } = useStoreContext();

  return (
    <div className="text-foreground group relative overflow-hidden rounded-xl bg-card/25 border border-card transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <Image
          src={product.thumbUrl || placeholderThumb}
          alt={product.name}
          className="object-contain transition-transform duration-500 group-hover:scale-110"
          fill
        />
      </div>

      <div className="space-y-2 p-4">
        <h3 className="text-balance text-base md:text-md font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-md md:text-xl font-bold text-primary">
            {formatCurrencyBrl(product.price)}
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            className="text-foreground w-2/3 cursor-pointer"
            onClick={() => addToCart(product)}
          >
            <ShoppingBag />
          </Button>
          <Button
            className="bg-transparent hover:bg-red-500 w-1/3 cursor-pointer"
            variant="outline"
          >
            <Heart />
          </Button>
        </div>
      </div>
    </div>
  );
}
