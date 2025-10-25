"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatCurrencyBrl } from "@/utils/formatCurrencyBrl";
import { useStoreContext, CartItem } from "../_context/StoreContext";
import { Badge } from "@/components/ui/badge";

export function CartDrawer() {
  const { cartItems, cartTotal, cartCount, clearCart } = useStoreContext();

  const handleCheckout = () => {
    const phoneNumber = "5511999998888";

    let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
    cartItems.forEach((item) => {
      message += `*${item.name}*\n`;
      message += `Quantidade: ${item.quantity}\n`;
      message += `Preço: ${formatCurrencyBrl(item.price * item.quantity)}\n\n`;
    });
    message += `*Total: ${formatCurrencyBrl(cartTotal)}*`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    clearCart();
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Drawer>
      <DrawerTrigger className="text-foreground bg-card hover:bg-primary hover:text-secondary cursor-pointer size-10 rounded-lg flex items-center justify-center relative">
        <ShoppingBag />
        {cartCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {cartCount}
          </Badge>
        )}
      </DrawerTrigger>

      <DrawerContent className="layout-size text-foreground">
        <DrawerHeader className="border-b border-border/50">
          <DrawerTitle className="text-xl">Carrinho de compras</DrawerTitle>
          <DrawerDescription>
            {cartItems.length > 0
              ? "Revise seus itens antes de finalizar"
              : "Seu carrinho está vazio"}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col max-h-[60vh] overflow-y-auto">
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((cartItem, index) => (
                <li key={cartItem.id}>
                  <ListItem cartItem={cartItem} />
                  {index !== cartItems.length - 1 && (
                    <ItemSeparator className="opacity-30" />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground p-8">
              Nenhum item no carrinho.
            </p>
          )}
        </div>

        <DrawerFooter className="border-t border-border/50">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-muted-foreground">Total:</span>
            <span className="text-xl font-bold">
              {formatCurrencyBrl(cartTotal)}
            </span>
          </div>
          <Button
            className="text-foreground cursor-pointer font-semibold tracking-wider"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Finalizar Compra
          </Button>

          <DrawerClose asChild>
            <Button className="cursor-pointer tracking-wider" variant="outline">
              Continuar Comprando
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ListItem({ cartItem }: { cartItem: CartItem }) {
  const { updateItemQuantity, removeFromCart } = useStoreContext();

  return (
    <Item className="rounded-none border-0 hover:bg-muted/30 transition-colors">
      <ItemMedia>
        <Avatar className="h-16 w-16 rounded-md">
          <AvatarImage
            src={cartItem.thumbUrl ?? "/placeholderThumb.png"}
            className="object-cover"
          />
          <AvatarFallback className="rounded-md bg-muted">PH</AvatarFallback>
        </Avatar>
      </ItemMedia>

      <ItemContent className="gap-1">
        <ItemTitle className="font-semibold">{cartItem.name}</ItemTitle>
        <ItemDescription className="text-primary font-medium">
          {formatCurrencyBrl(cartItem.price * cartItem.quantity)}
        </ItemDescription>
      </ItemContent>

      <ItemActions className="gap-2 sm:gap-3">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary"
          onClick={() => updateItemQuantity(cartItem.id, cartItem.quantity - 1)}
        >
          {cartItem.quantity > 1 ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Trash2 className="h-4 w-4 text-destructive" />
          )}
        </Button>

        <span className="font-semibold min-w-[2ch] text-center">
          {cartItem.quantity}
        </span>

        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary"
          onClick={() => updateItemQuantity(cartItem.id, cartItem.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </ItemActions>
    </Item>
  );
}
