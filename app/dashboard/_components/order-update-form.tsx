"use client";

import type React from "react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrderContext } from "../_context/OrderContext";
import { displayErrorToast } from "@/utils/displayToast";
import { Order, OrderStatus } from "@prisma/client";

interface OrderUpdateFormProps {
  order: Order;
  isUpdating: boolean;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
}

export function OrderUpdateForm({
  order,
  isUpdating,
  setIsUpdating,
}: OrderUpdateFormProps) {
  const { updateOrder } = useOrderContext();

  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateOrder({
        id: order.id,
        status,
      });
    } catch (error) {
      displayErrorToast(String(error));
    } finally {
      setIsSubmitting(false);
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isUpdating} onOpenChange={setIsUpdating}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Pedido</DialogTitle>
          <DialogDescription>Atualizar status do pedido</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(value: OrderStatus) => setStatus(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={OrderStatus.PROCESSING}>
                  Processando
                </SelectItem>
                <SelectItem value={OrderStatus.COMPLETED}>Concluído</SelectItem>
                <SelectItem value={OrderStatus.CANCELED}>Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsUpdating(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Atualizar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
