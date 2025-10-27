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
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const CUSTOMERS_PATH = "/dashboard/customers";

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

    const newCustomer = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          id: authUserId,
          email: email,
          role: Role.CLIENT,
        },
      });

      const customer = await tx.customer.create({
        data: {
          name,
          email,
          avatarUrl,
          userId: newUser.id,
        },
      });

      return customer;
    });

    revalidatePath(CUSTOMERS_PATH);
    return {
      data: newCustomer,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = error.meta?.target as string[];
        if (target.includes("email")) {
          return { error: "Este e-mail já está em uso (Prisma)." };
        }
        if (target.includes("userId")) {
          return { error: "Este ID de usuário já está vinculado (Prisma)." };
        }
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

  const { id: updateId, email: newEmail, ...restOfData } = validation.data;
  const supabaseAdmin = createSupabaseAdminClient();

  try {
    const updatedCustomer = await prisma.$transaction(async (tx) => {
      const currentCustomer = await tx.customer.findUniqueOrThrow({
        where: { id: updateId },
      });

      if (newEmail && newEmail !== currentCustomer.email) {
        const { error: authError } =
          await supabaseAdmin.auth.admin.updateUserById(
            currentCustomer.userId,
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
          where: { id: currentCustomer.userId },
          data: { email: newEmail },
        });
      }

      const customer = await tx.customer.update({
        where: {
          id: updateId,
        },
        data: {
          email: newEmail,
          ...restOfData,
        },
      });

      return customer;
    });

    revalidatePath(CUSTOMERS_PATH);
    return {
      data: updatedCustomer,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (
        error.code === "P2002" &&
        (error.meta?.target as string[]).includes("email")
      ) {
        return {
          error: "Este e-mail já está em uso por outro cliente (Prisma).",
        };
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

  const supabaseAdmin = createSupabaseAdminClient();

  try {
    const customerToDelete = await prisma.customer.findUnique({
      where: { id: deleteId },
      select: { userId: true },
    });

    if (!customerToDelete) {
      return { error: "Cliente não encontrado." };
    }
    const authUserId = customerToDelete.userId;

    await prisma.$transaction(async (tx) => {
      await tx.customer.delete({
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

    revalidatePath(CUSTOMERS_PATH);
    return { data: { message: "Cliente deletado com sucesso!" } };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return {
          error: "Não é possível deletar um cliente que possui pedidos.",
        };
      }
    }
    return { error: String(error) };
  }
}
