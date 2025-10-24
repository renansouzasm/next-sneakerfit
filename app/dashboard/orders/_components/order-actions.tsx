"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useOrderContext } from "../../_context/OrderContext";
import { displayErrorToast } from "@/utils/displayToast";
import { OrderStatus } from "@prisma/client";
import type { OrderWithDetails } from "@/hooks/useOrder";

interface OrderActionsProps {
  order: OrderWithDetails;
}

export function OrderActions({ order }: OrderActionsProps) {
  const { updateOrder, deleteOrder } = useOrderContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState<OrderStatus>(order.status);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateOrder({
        id: order.id,
        status: status,
      });

      setIsOpen(false);
    } catch (error) {
      displayErrorToast(String(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    try {
      if (window.confirm("Tem certeza que deseja deletar este pedido?")) {
        await deleteOrder(order.id);
      }
    } catch (error) {
      displayErrorToast(String(error));
    }
  }

  return (
    <div className="space-x-2">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>Editar</Button>
        </SheetTrigger>

        <SheetContent className="p-4 overflow-y-auto">
          <SheetHeader className="p-0">
            <SheetTitle>Editar Pedido</SheetTitle>
            <SheetDescription>
              {`Pedido ID: ${order.id.substring(0, 10)}...`}
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                onValueChange={(v) => setStatus(v as OrderStatus)}
                value={status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status do Pedido</SelectLabel>
                    <SelectItem value={OrderStatus.PROCESSING}>
                      Processando
                    </SelectItem>
                    <SelectItem value={OrderStatus.COMPLETED}>
                      Concluído
                    </SelectItem>
                    <SelectItem value={OrderStatus.CANCELED}>
                      Cancelado
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <SheetFooter className="p-0 flex justify-between">
              <SheetClose asChild>
                <Button variant="outline">Cancelar</Button>
              </SheetClose>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      <Button variant="destructive" onClick={handleDelete}>
        Deletar
      </Button>
    </div>
  );
}
