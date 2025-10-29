import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Minus, PlusIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag } from "lucide-react";
import { Fragment, useState } from "react";
import { formatCurrencyBrl } from "@/utils/formatCurrencyBrl";
import { WhatsappLogo } from "@phosphor-icons/react";
import { useCartContext } from "../_context/CartContext";
import { generateWhatsappLink } from "@/utils/generateWhatsappLink";
import { displayInfoToast } from "@/utils/displayToast";

export function CartSheet() {
  const { cartProducts, increaseQuantity, decreaseQuantity } = useCartContext();
  const [address, setAddress] = useState("");
  const total = cartProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  function handleCheckout() {
    try {
      const link = generateWhatsappLink({
        phone: "5511999999999",
        cartProducts,
        address,
      });

      window.open(link, "_blank");
    } catch (error) {
      displayInfoToast(String(error));
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="cursor-pointer">
          <ShoppingBag />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho de Compras</SheetTitle>
        </SheetHeader>

        <div className="flex w-full h-full flex-col overflow-y-scroll">
          <ItemGroup>
            {cartProducts.map((product, index) => (
              <Fragment key={product.id}>
                <Item className="flex wrap-anywhere items-start">
                  <ItemMedia>
                    <Avatar className="rounded-lg">
                      <AvatarImage
                        className="object-cover"
                        src={product.thumbUrl ?? "/placeholder.svg"}
                      />
                      <AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </ItemMedia>

                  <ItemContent className="gap-1">
                    <ItemTitle className="capitalize line-clamp-2">
                      {product.name}
                    </ItemTitle>
                    <ItemDescription>
                      {formatCurrencyBrl(product.price * product.quantity)}
                    </ItemDescription>
                  </ItemContent>

                  <ItemActions>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        className="rounded-full cursor-pointer"
                        onClick={() => decreaseQuantity(product.id)}
                      >
                        <Minus />
                      </Button>
                      {product.quantity}
                      <Button
                        size="icon"
                        className="rounded-full cursor-pointer"
                        onClick={() => increaseQuantity(product.id)}
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                  </ItemActions>
                </Item>

                {index !== cartProducts.length - 1 && <ItemSeparator />}
              </Fragment>
            ))}
          </ItemGroup>
        </div>

        <ItemSeparator />

        <div className="px-4 space-y-2">
          <h3>Total: {formatCurrencyBrl(total)}</h3>

          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Endereço</Label>
            <Input
              id="sheet-demo-name"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Ex: Rua Exemplo, 999"
            />
          </div>
        </div>

        <ItemSeparator />

        <SheetFooter>
          <Button
            className="cursor-pointer"
            type="submit"
            onClick={handleCheckout}
          >
            <WhatsappLogo /> Prosseguir
          </Button>

          <SheetClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancelar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
