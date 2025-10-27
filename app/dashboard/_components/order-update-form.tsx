"use client";

import type React from "react";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import type { Order } from "@prisma/client";

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
  return <></>;
  // const { updateOrder } = useOrderContext();
  // const [totalValue, setTotalValue] = useState(order.totalValue.toString());
  // const [status, setStatus] = useState<"PROCESSING" | "COMPLETED" | "CANCELED">(
  //   order.status as "PROCESSING" | "COMPLETED" | "CANCELED"
  // );
  // const [customerId, setCustomerId] = useState(order.customerId);

  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     await updateOrder({
  //       id: order.id,
  //       totalValue: Number.parseFloat(totalValue),
  //       status,
  //       customerId,
  //     });
  //   } catch (error) {
  //     displayErrorToast(String(error));
  //   } finally {
  //     setIsSubmitting(false);
  //     setIsUpdating(false);
  //   }
  // };

  // return (
  //   <Dialog open={isUpdating} onOpenChange={setIsUpdating}>
  //     <DialogContent>
  //       <DialogHeader>
  //         <DialogTitle>Editar Pedido</DialogTitle>
  //         <DialogDescription>
  //           Atualize as informações do pedido #{order.id}
  //         </DialogDescription>
  //       </DialogHeader>

  //       <form onSubmit={handleSubmit} className="space-y-4">
  //         <div className="space-y-2">
  //           <Label htmlFor="totalValue">Valor Total</Label>
  //           <Input
  //             id="totalValue"
  //             type="number"
  //             min="0"
  //             value={totalValue}
  //             onChange={(event) => setTotalValue(event.target.value)}
  //             placeholder="0.00"
  //             required
  //           />
  //         </div>

  //         <div className="space-y-2">
  //           <Label htmlFor="status">Status</Label>
  //           <Select
  //             value={status}
  //             onValueChange={(value: "PROCESSING" | "COMPLETED" | "CANCELED") =>
  //               setStatus(value)
  //             }
  //           >
  //             <SelectTrigger>
  //               <SelectValue />
  //             </SelectTrigger>
  //             <SelectContent>
  //               <SelectItem value="PROCESSING">Processando</SelectItem>
  //               <SelectItem value="COMPLETED">Concluído</SelectItem>
  //               <SelectItem value="CANCELED">Cancelado</SelectItem>
  //             </SelectContent>
  //           </Select>
  //         </div>

  //         <div className="space-y-2">
  //           <Label htmlFor="customerId">ID do Cliente</Label>
  //           <Input
  //             id="customerId"
  //             value={customerId}
  //             onChange={(event) => setCustomerId(event.target.value)}
  //             placeholder="ID do cliente"
  //             required
  //           />
  //         </div>

  //         <div className="flex justify-end gap-3 pt-4">
  //           <Button
  //             type="button"
  //             variant="outline"
  //             onClick={() => setIsUpdating(false)}
  //           >
  //             Cancelar
  //           </Button>
  //           <Button type="submit" disabled={isSubmitting}>
  //             {isSubmitting ? "Salvando..." : "Atualizar"}
  //           </Button>
  //         </div>
  //       </form>
  //     </DialogContent>
  //   </Dialog>
  // );
}
