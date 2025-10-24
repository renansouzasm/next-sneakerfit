import { z } from "zod";

const customerBaseSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nome precisa ter no mínimo 3 caracteres." }),
  email: z.string().email({ message: "Email inválido." }),
  avatarUrl: z.string().url({ message: "URL do avatar inválida." }).nullable(),
});

export const customerCreateSchema = customerBaseSchema;

export const customerUpdateSchema = customerBaseSchema.partial().extend({
  id: z.string().cuid({ message: "ID do cliente inválido." }),
});

export type CustomerCreateForm = z.infer<typeof customerCreateSchema>;
export type CustomerUpdateForm = z.infer<typeof customerUpdateSchema>;
