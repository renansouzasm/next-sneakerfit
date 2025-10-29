import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getAvatars } from "@/utils/avatars";

export function AvatarGrid() {
  const [avatar, setAvatar] = useState({
    avatarUrl: "/avatars/avatar-1.jpg",
    avatarAlt: "Avatar 1",
  });

  const avatars = getAvatars();

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-transparent hover:bg-transparent cursor-pointer size-fit p-0">
            <Avatar>
              <AvatarImage src={avatar.avatarUrl} alt={avatar.avatarAlt} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] w-fit">
          <DialogHeader>
            <DialogTitle>Editar Avatar</DialogTitle>
            <DialogDescription>
              Escolha um avatar para a conta.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-3 justify-center gap-2">
            {avatars.map((avatar, index) => (
              <Button
                key={index}
                className="bg-transparent hover:bg-transparent m-auto cursor-pointer p-0 size-16"
                onClick={() => setAvatar(avatar)}
              >
                <Avatar className="size-full">
                  <AvatarImage
                    className="object-cover"
                    src={avatar.avatarUrl}
                    alt={avatar.avatarAlt}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Button>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">
                Cancelar
              </Button>
            </DialogClose>

            <Button className="cursor-pointer" type="submit">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
