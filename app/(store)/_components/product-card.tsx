import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { Toggle } from "@/components/ui/toggle";
import { formatCurrencyBrl } from "@/utils/formatCurrencyBrl";
import { Product } from "@prisma/client";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useStoreContext } from "../_context/StoreContext";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { cartItems, addToCart, removeFromCart } = useStoreContext();

  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleCartToggle = (pressed: boolean) => {
    if (pressed) {
      addToCart(product);
    } else {
      removeFromCart(product.id);
    }
  };

  return (
    <Item
      key={product.id}
      className="group p-0"
    >
      <ItemHeader className="bg-zinc-900 border-red-800 overflow-hidden relative aspect-square">
        <Image
          className="object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-20"
          src={product.thumbUrl ?? "/placeholderThumb.png"}
          alt={product.name}
          fill
        />
      </ItemHeader>

      <ItemContent className="p-4 space-y-3">
        <div>
          <ItemTitle className="font-semibold text-base group-hover:text-primary transition-colors">
            <Link href={`/product/${product.id}`}>{product.name}</Link>
          </ItemTitle>
          <ItemDescription className="text-foreground font-bold text-lg mt-1">
            {formatCurrencyBrl(product.price)}
          </ItemDescription>
        </div>

        <div className="flex gap-2">
          <Toggle
            size="sm"
            variant={"outline"}
            className="flex-1 hover:bg-red-500 data-[state=on]:bg-red-500 transition-all"
          >
            <Heart className="h-4 w-4 transition-all data-[state=on]:fill-current" />
          </Toggle>

          <Toggle
            size="sm"
            className="flex-1 bg-muted/50 hover:bg-muted data-[state=on]:bg-primary data-[state=on]:text-primary-foreground transition-all"
            pressed={isInCart}
            onPressedChange={handleCartToggle}
          >
            <ShoppingBag className="h-4 w-4" />
          </Toggle>
        </div>
      </ItemContent>
    </Item>
  );
}
