import { z } from "zod";
import { OrderStatus } from "@prisma/client";

export const orderUpdateSchema = z.object({
  id: z.string().cuid({ message: "ID do pedido inválido." }),
  status: z.enum(OrderStatus, {
    message: "Status do pedido inválido.",
  }),
});

export type OrderUpdateForm = z.infer<typeof orderUpdateSchema>;
