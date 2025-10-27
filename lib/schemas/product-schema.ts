import { z } from "zod";
import { ProductBrand } from "@prisma/client";

const productBaseSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nome precisa ter no mínimo 3 caracteres." })
    .max(100, { message: "Nome muito extenso." }),

  brand: z.enum(ProductBrand, {
    message: "Marca inválida.",
  }),

  price: z.coerce
    .number({ message: "Preço precisa ser um número." })
    .positive({ message: "Preço precisa ser um valor positivo." }),

  stock: z
    .number({ message: "Estoque precisa ser um número." })
    .int({ message: "Estoque precisa ser um número inteiro." })
    .min(0, { message: "Estoque não pode ser negativo." }),

  thumbUrl: z.string().nullable(),
  // thumbUrl: z.string().url({ message: "URL da imagem inválida." }).nullable(),
});

export const productCreateSchema = productBaseSchema;

export const productUpdateSchema = productBaseSchema.partial().extend({
  id: z.string().cuid(),
});

export type ProductCreateForm = z.infer<typeof productCreateSchema>;
export type ProductUpdateForm = z.infer<typeof productUpdateSchema>;
