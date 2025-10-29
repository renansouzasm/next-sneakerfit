import { Button } from "@/components/ui/button";
import { formatCurrencyBrl } from "@/utils/formatCurrencyBrl";
import { Product } from "@prisma/client";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCartContext } from "../_context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addNewProduct } = useCartContext();

  return (
    <div className="bg-card border group relative overflow-hidden rounded-xl transition-all">
      <div className="absolute left-4 top-4 z-10">
        <span className="inline-block rounded-md bg-background px-4 py-2 text-xs font-semibold tracking-wide text-foreground">
          {product.brand}
        </span>
      </div>

      <div className="min-h-72">
        <div className="relative w-full h-42 aspect-square overflow-hidden">
          <Image
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            src={product.thumbUrl || "/placeholder.svg"}
            alt={product.name}
            fill
          />
        </div>

        <div className="p-4">
          <div className="mb-3 flex items-start justify-between gap-4">
            <h3 className="text-balance text-lg font-semibold leading-tight text-foreground line-clamp-2">
              {product.name}
            </h3>
          </div>

          <p className="text-base font-medium text-foreground">
            {formatCurrencyBrl(product.price)}
          </p>
        </div>
      </div>

      <div className="flex p-4 justify-end gap-2">
        <Button className="hover:text-red-600 cursor-pointer" variant="outline">
          <Heart />
        </Button>

        <Button
          className="cursor-pointer"
          onClick={() => addNewProduct(product)}
        >
          <ShoppingBag />
        </Button>
      </div>
    </div>
  );
}
