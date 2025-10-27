"use server";

import {
  employeeCreateSchema,
  EmployeeCreateForm,
  employeeUpdateSchema,
  EmployeeUpdateForm,
} from "@/lib/schemas/employee-schema";
import { revalidatePath } from "next/cache";
import { Prisma, Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const EMPLOYEES_PATH = "/dashboard/employees";

export async function getEmployeesAction() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: "desc" },
    });
    return {
      data: employees,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function getEmployeeByIdAction(getEmployeeId: string) {
  if (!getEmployeeId) {
    return {
      error: "ID do empregado não fornecido.",
    };
  }

  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: getEmployeeId,
      },
    });
    return {
      data: employee,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function createEmployeeAction(formData: EmployeeCreateForm) {
  const validation = employeeCreateSchema.safeParse(formData);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
    };
  }

  const { name, email, cpf, status, avatarUrl } = validation.data;
  const supabaseAdmin = createSupabaseAdminClient();

  try {
    const { data: inviteData, error: inviteError } =
      await supabaseAdmin.auth.admin.inviteUserByEmail(email);

    if (inviteError) {
      if (inviteError.status === 422) {
        return {
          error: "Este e-mail já está em uso no sistema de autenticação.",
        };
      }
      return { error: `Erro no Supabase Auth: ${inviteError.message}` };
    }

    const authUserId = inviteData.user.id;

    const newEmployee = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          id: authUserId,
          email: email,
          role: Role.EMPLOYEE,
        },
      });

      const employee = await tx.employee.create({
        data: {
          name,
          email,
          cpf,
          status,
          avatarUrl,
          userId: newUser.id,
        },
      });

      return employee;
    });

    revalidatePath(EMPLOYEES_PATH);
    return {
      data: newEmployee,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = error.meta?.target as string[];
        if (target.includes("email")) {
          return { error: "Este e-mail já está em uso (Prisma)." };
        }
        if (target.includes("cpf")) {
          return { error: "Este CPF já está em uso (Prisma)." };
        }
        if (target.includes("userId")) {
          return { error: "Este ID de usuário já está vinculado (Prisma)." };
        }
      }
    }
    return { error: String(error) };
  }
}

export async function updateEmployeeAction(updatedData: EmployeeUpdateForm) {
  const validation = employeeUpdateSchema.safeParse(updatedData);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
    };
  }

  const { id: updateId, email: newEmail, ...restOfData } = validation.data;
  const supabaseAdmin = createSupabaseAdminClient();

  try {
    const updatedEmployee = await prisma.$transaction(async (tx) => {
      const currentEmployee = await tx.employee.findUniqueOrThrow({
        where: { id: updateId },
      });

      if (newEmail && newEmail !== currentEmployee.email) {
        const { error: authError } =
          await supabaseAdmin.auth.admin.updateUserById(
            currentEmployee.userId,
            {
              email: newEmail,
            }
          );

        if (authError) {
          if (authError.status === 422) {
            throw new Error("E-mail já em uso no sistema de autenticação.");
          }
          throw new Error(`Erro no Supabase Auth: ${authError.message}`);
        }

        await tx.user.update({
          where: { id: currentEmployee.userId },
          data: { email: newEmail },
        });
      }

      const employee = await tx.employee.update({
        where: {
          id: updateId,
        },
        data: {
          email: newEmail,
          ...restOfData,
        },
      });

      return employee;
    });

    revalidatePath(EMPLOYEES_PATH);
    return {
      data: updatedEmployee,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = error.meta?.target as string[];
        if (target.includes("email")) {
          return { error: "Este e-mail já está em uso (Prisma)." };
        }
        if (target.includes("cpf")) {
          return { error: "Este CPF já está em uso (Prisma)." };
        }
      }
    }
    return { error: String(error) };
  }
}

export async function deleteEmployeeAction(deleteId: string) {
  if (!deleteId) {
    return {
      error: "ID do empregado não fornecido.",
    };
  }

  const supabaseAdmin = createSupabaseAdminClient();

  try {
    const employeeToDelete = await prisma.employee.findUnique({
      where: { id: deleteId },
      select: { userId: true },
    });

    if (!employeeToDelete) {
      return { error: "Funcionário não encontrado." };
    }
    const authUserId = employeeToDelete.userId;

    await prisma.$transaction(async (tx) => {
      await tx.employee.delete({
        where: { id: deleteId },
      });

      await tx.user.delete({
        where: { id: authUserId },
      });
    });

    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(
      authUserId
    );

    if (authError) {
      console.warn(
        `[WARN] Falha ao deletar usuário do Auth: ${authError.message}`
      );
    }

    revalidatePath(EMPLOYEES_PATH);
    return { data: { message: "Empregado deletado com sucesso!" } };
  } catch (error) {
    return { error: String(error) };
  }
}
