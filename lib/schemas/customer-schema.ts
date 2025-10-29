import { z } from "zod";

const customerBaseSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nome precisa ter no mínimo 3 caracteres." }),

  email: z.string().refine((value) => value.includes("@")),

  avatarUrl: z.string().nullable().optional(),
});

export const customerCreateSchema = customerBaseSchema;

export const customerUpdateSchema = customerBaseSchema.partial().extend({
  id: z.string().cuid({ message: "ID de cliente inválido." }),
});

export type CustomerCreateForm = z.infer<typeof customerCreateSchema>;
export type CustomerUpdateForm = z.infer<typeof customerUpdateSchema>;
