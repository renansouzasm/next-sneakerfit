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
import { Fragment } from "react";
import { formatCurrencyBrl } from "@/utils/formatCurrencyBrl";
import { WhatsappLogo } from "@phosphor-icons/react";

export function CartSheet() {
  const people = [
    {
      username: "shadcn",
      avatar: "https://github.com/shadcn.png",
      email: "shadcn@vercel.com",
    },
    {
      username: "maxleiter",
      avatar: "https://github.com/maxleiter.png",
      email: "maxleiter@vercel.com",
    },
    {
      username: "evilrabbit",
      avatar: "https://github.com/evilrabbit.png",
      email: "evilrabbit@vercel.com",
    },
  ];

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

        <div className="flex w-full flex-col overflow-y-scroll">
          <ItemGroup>
            {people.map((person, index) => (
              <Fragment key={index}>
                <Item className="flex wrap-anywhere items-start">
                  <ItemMedia>
                    <Avatar className="rounded-lg">
                      <AvatarImage src={person.avatar ?? "/placeholder.svg"} />
                      <AvatarFallback>
                        {person.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </ItemMedia>

                  <ItemContent className="gap-1">
                    <ItemTitle className="capitalize line-clamp-2">
                      {"Nome do Produto"}
                    </ItemTitle>
                    <ItemDescription>
                      {formatCurrencyBrl(100000)}
                    </ItemDescription>
                  </ItemContent>

                  <ItemActions>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        className="rounded-full cursor-pointer"
                      >
                        <Minus />
                      </Button>
                      {0}
                      <Button
                        size="icon"
                        className="rounded-full cursor-pointer"
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                  </ItemActions>
                </Item>

                {index !== people.length - 1 && <ItemSeparator />}
              </Fragment>
            ))}
          </ItemGroup>
        </div>

        <div className="px-4 space-y-2">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Endereço</Label>
            <Input id="sheet-demo-name" placeholder="Ex: Rua Exemplo, 999" />
          </div>
        </div>

        <SheetFooter>
          <Button className="cursor-pointer" type="submit">
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
