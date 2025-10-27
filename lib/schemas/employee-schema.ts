import { z } from "zod";
import { EmployeeStatus } from "@prisma/client";

const employeeBaseSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nome precisa ter no mínimo 3 caracteres." }),

  email: z.string().email({ message: "E-mail inválido." }),

  cpf: z.string().min(11, { message: "CPF deve ter no mínimo 11 caracteres." }),

  status: z.enum(EmployeeStatus, {
    message: "Status inválido.",
  }),

  avatarUrl: z.string().nullable(),
  // avatarUrl: z.string().url({ message: "URL do avatar inválida." }).nullable(),
});

export const employeeCreateSchema = employeeBaseSchema;

export const employeeUpdateSchema = employeeBaseSchema.partial().extend({
  id: z.string().cuid({ message: "ID de empregado inválido." }),
});

export type EmployeeCreateForm = z.infer<typeof employeeCreateSchema>;
export type EmployeeUpdateForm = z.infer<typeof employeeUpdateSchema>;
