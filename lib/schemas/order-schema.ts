import { z } from "zod";
import { OrderStatus } from "@prisma/client";

const orderItemSchema = z.object({
  productId: z.string().cuid({ message: "ID de produto inválido." }),

  quantity: z.coerce
    .number({ message: "Quantidade precisa ser um número." })
    .int()
    .min(1, { message: "Quantidade mínima de 1." }),
});

export const orderCreateSchema = z.object({
  customerId: z.string().cuid({ message: "ID de cliente inválido." }),

  items: z
    .array(orderItemSchema)
    .min(1, { message: "O pedido precisa ter pelo menos um item." }),
});

export const orderUpdateSchema = z.object({
  id: z.string().cuid({ message: "ID do pedido inválido." }),

  status: z.enum(OrderStatus, {
    message: "Status inválido.",
  }),
});

export type OrderCreateForm = z.infer<typeof orderCreateSchema>;
export type OrderUpdateForm = z.infer<typeof orderUpdateSchema>;
