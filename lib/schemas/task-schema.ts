import { z } from "zod";
import { TaskStatus } from "@prisma/client";

const taskBaseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Título precisa ter no mínimo 3 caracteres." })
    .max(150, { message: "Título muito extenso." }),

  description: z
    .string()
    .max(500, { message: "Descrição muito extensa." })
    .nullable(),

  dueDate: z.coerce.date().nullable(),

  employeeIds: z.array(z.string().cuid()).optional().default([]),
});

export const taskCreateSchema = taskBaseSchema;

export const taskUpdateSchema = taskBaseSchema.partial().extend({
  id: z.string().cuid({ message: "ID de tarefa inválido." }),

  status: z.enum(TaskStatus, {
    message: "Status inválido.",
  }),
});

export type TaskCreateForm = z.infer<typeof taskCreateSchema>;
export type TaskUpdateForm = z.infer<typeof taskUpdateSchema>;
