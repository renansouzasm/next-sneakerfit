"use server";

import {
  customerCreateSchema,
  CustomerCreateForm,
  customerUpdateSchema,
  CustomerUpdateForm,
} from "@/lib/schemas/customer-schema";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

const CUSTOMERS_PATH = "/dashboard/customers";

export async function getCustomersAction() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        user: true,
        orders: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      data: customers,
    };
  } catch (error) {
    return {
      error: String(error),
    };
  }
}

export async function getCustomerByIdAction(customerId: string) {
  if (!customerId) return { error: "ID do cliente não fornecido." };

  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
      include: {
        user: true,
        orders: {
          include: {
            items: true,
          },
        },
      },
    });

    if (!customer) return { error: "Cliente não encontrado." };
    return { data: customer };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function createCustomerAction(formData: CustomerCreateForm) {
  const validation = customerCreateSchema.safeParse(formData);

  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors };
  }

  const { name, email, avatarUrl } = validation.data;

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        role: Role.CLIENT,
      },
    });

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        avatarUrl,
        userId: newUser.id,
      },
    });

    revalidatePath(CUSTOMERS_PATH);
    return {
      data: newCustomer,
    };
  } catch (error) {
    return {
      error: String(error),
    };
  }
}

export async function updateCustomerAction(updatedData: CustomerUpdateForm) {
  const validation = customerUpdateSchema.safeParse(updatedData);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
    };
  }

  const { id, ...data } = validation.data;

  try {
    const updatedCustomer = await prisma.customer.update({
      where: {
        id,
      },
      data,
    });

    revalidatePath(CUSTOMERS_PATH);
    return {
      data: updatedCustomer,
    };
  } catch (error) {
    return {
      error: String(error),
    };
  }
}

export async function deleteCustomerAction(deleteId: string) {
  if (!deleteId) {
    return {
      error: "ID do cliente não fornecido.",
    };
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: deleteId,
      },
    });

    if (!customer) {
      return {
        error: "Cliente não encontrado.",
      };
    }

    await prisma.customer.delete({
      where: { id: deleteId },
    });

    await prisma.user.delete({
      where: { id: customer.userId },
    });

    revalidatePath(CUSTOMERS_PATH);
    return {
      data: {
        message: "Cliente deletado com sucesso!",
      },
    };
  } catch (error) {
    return {
      error: String(error),
    };
  }
}
