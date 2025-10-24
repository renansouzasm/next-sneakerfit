"use server";

import {
  customerCreateSchema,
  CustomerCreateForm,
  customerUpdateSchema,
  CustomerUpdateForm,
} from "@/lib/schemas/customer-schema";
import { revalidatePath } from "next/cache";
import { Prisma, Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getPathFromUrl(url: string) {
  try {
    const { pathname } = new URL(url);
    const path = pathname.split("/user-avatars/")[1];
    return path;
  } catch (error) {
    console.error("URL inválida:", error);
    return null;
  }
}

export async function getCustomersAction() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
    });
    return {
      data: customers,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function getCustomerByIdAction(getCustomerId: string) {
  if (!getCustomerId) {
    return {
      error: "ID do cliente não fornecido.",
    };
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: getCustomerId,
      },
    });
    return {
      data: customer,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function createCustomerAction(formData: CustomerCreateForm) {
  const validation = customerCreateSchema.safeParse(formData);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
    };
  }

  const { name, email, avatarUrl } = validation.data;

  try {
    const newCustomer = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: email,
          role: Role.CLIENT,
        },
      });

      const newCustomer = await tx.customer.create({
        data: {
          name,
          email,
          avatarUrl,
          userId: newUser.id,
        },
      });

      return newCustomer;
    });

    revalidatePath("/dashboard/customers");

    return {
      data: newCustomer,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { error: "Um usuário com este email já existe." };
      }
    }
    return { error: String(error) };
  }
}

export async function updateCustomerAction(updatedData: CustomerUpdateForm) {
  const validation = customerUpdateSchema.safeParse(updatedData);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
    };
  }

  const { id: updateId, ...restOfData } = validation.data;
  const { name, email, avatarUrl } = restOfData;

  try {
    const oldCustomer = await prisma.customer.findUnique({
      where: { id: updateId },
      select: { avatarUrl: true, userId: true, email: true },
    });

    if (!oldCustomer) {
      return { error: "Cliente não encontrado." };
    }

    const oldUrl = oldCustomer.avatarUrl;
    const newUrl = avatarUrl;

    const updatedCustomer = await prisma.$transaction(async (tx) => {
      const updatedCustomer = await tx.customer.update({
        where: {
          id: updateId,
        },
        data: {
          name,
          email,
          avatarUrl: newUrl,
        },
      });

      if (email && email !== oldCustomer.email) {
        await tx.user.update({
          where: { id: oldCustomer.userId },
          data: { email: email },
        });
      }

      return updatedCustomer;
    });

    if (oldUrl && newUrl && oldUrl !== newUrl) {
      const supabase = await createSupabaseServerClient();
      const oldPath = getPathFromUrl(oldUrl);
      if (oldPath) {
        await supabase.storage.from("user-avatars").remove([oldPath]);
      }
    }

    revalidatePath("/dashboard/customers");

    return {
      data: updatedCustomer,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { error: "Um usuário com este email já existe." };
      }
    }
    return { error: String(error) };
  }
}

export async function deleteCustomerAction(deleteId: string) {
  if (!deleteId) {
    return {
      error: "ID do cliente não fornecido.",
    };
  }

  const supabase = await createSupabaseServerClient();

  try {
    const customer = await prisma.customer.findUnique({
      where: { id: deleteId },
      select: { avatarUrl: true, userId: true },
    });

    if (!customer) {
      return { error: "Cliente não encontrado." };
    }

    await prisma.$transaction(async (tx) => {
      await tx.customer.delete({
        where: { id: deleteId },
      });
      await tx.user.delete({
        where: { id: customer.userId },
      });
    });

    if (customer.avatarUrl) {
      const filePath = getPathFromUrl(customer.avatarUrl);
      if (filePath) {
        await supabase.storage.from("user-avatars").remove([filePath]);
      }
    }

    revalidatePath("/dashboard/customers");

    return { data: { message: "Cliente deletado com sucesso!" } };
  } catch (error) {
    return { error: String(error) };
  }
}
