"use server";

import {
  employeeCreateSchema,
  EmployeeCreateForm,
  employeeUpdateSchema,
  EmployeeUpdateForm,
} from "@/lib/schemas/employee-schema";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Role, EmployeeStatus } from "@prisma/client";

const EMPLOYEES_PATH = "/dashboard/employees";

export async function getEmployeesAction() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        user: true,
        tasks: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: employees,
    };
  } catch (error) {
    return {
      error: String(error),
    };
  }
}

export async function getEmployeeByIdAction(employeeId: string) {
  if (!employeeId) {
    return {
      error: "ID do funcionário não fornecido.",
    };
  }

  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      include: {
        user: true,
        tasks: true,
      },
    });

    if (!employee) return { error: "Funcionário não encontrado." };

    return { data: employee };
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

  const { name, email, cpf, avatarUrl, status } = validation.data;

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        role: Role.EMPLOYEE,
      },
    });

    const newEmployee = await prisma.employee.create({
      data: {
        name,
        email,
        cpf,
        avatarUrl,
        status: status ?? EmployeeStatus.ACTIVE,
        userId: newUser.id,
      },
    });

    revalidatePath(EMPLOYEES_PATH);

    return {
      data: newEmployee,
    };
  } catch (error) {
    return {
      error: String(error),
    };
  }
}

export async function updateEmployeeAction(updatedData: EmployeeUpdateForm) {
  const validation = employeeUpdateSchema.safeParse(updatedData);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
    };
  }

  const { id, ...data } = validation.data;

  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data,
    });

    revalidatePath(EMPLOYEES_PATH);

    return {
      data: updatedEmployee,
    };
  } catch (error) {
    return {
      error: String(error),
    };
  }
}

export async function deleteEmployeeAction(deleteId: string) {
  if (!deleteId) return { error: "ID do funcionário não fornecido." };

  try {
    const employee = await prisma.employee.findUnique({
      where: { id: deleteId },
    });

    if (!employee) {
      return {
        error: "Funcionário não encontrado.",
      };
    }

    await prisma.employee.delete({
      where: {
        id: deleteId,
      },
    });

    await prisma.user.delete({
      where: {
        id: employee.userId,
      },
    });

    revalidatePath(EMPLOYEES_PATH);

    return {
      data: { message: "Funcionário deletado com sucesso!" },
    };
  } catch (error) {
    return {
      error: String(error),
    };
  }
}
