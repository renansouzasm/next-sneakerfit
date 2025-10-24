"use server";

import { orderUpdateSchema, OrderUpdateForm } from "@/lib/schemas/order-schema";
import { revalidatePath } from "next/cache";
import { OrderStatus, ProductStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

function getNewStatus(stock: number): ProductStatus {
  if (stock <= 0) return ProductStatus.NO_STOCK;
  if (stock <= 5) return ProductStatus.LOW_STOCK;
  return ProductStatus.AVAILABLE;
}

export async function getOrdersAction() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        items: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return {
      data: orders,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function getOrderByIdAction(getOrderId: string) {
  if (!getOrderId) {
    return {
      error: "ID do pedido não fornecido.",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: getOrderId,
      },
      include: {
        customer: true,
        items: true,
      },
    });
    return {
      data: order,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function updateOrderAction(updatedData: OrderUpdateForm) {
  const validation = orderUpdateSchema.safeParse(updatedData);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
    };
  }

  const { id, status: newStatus } = validation.data;

  try {
    const updatedOrder = await prisma.$transaction(async (tx) => {
      const oldOrder = await tx.order.findUnique({
        where: { id },
        include: { items: { include: { product: true } } },
      });

      if (!oldOrder) {
        throw new Error("Pedido não encontrado.");
      }

      const oldStatus = oldOrder.status;

      if (oldStatus !== newStatus) {
        if (newStatus === OrderStatus.CANCELED) {
          for (const item of oldOrder.items) {
            if (item.productId && item.product) {
              const newStock = item.product.stock + item.quantity;
              await tx.product.update({
                where: { id: item.productId },
                data: {
                  stock: { increment: item.quantity },
                  status: getNewStatus(newStock),
                },
              });
            }
          }
        } else if (oldStatus === OrderStatus.CANCELED) {
          for (const item of oldOrder.items) {
            if (item.productId && item.product) {
              if (item.product.stock < item.quantity) {
                throw new Error(
                  `Estoque insuficiente para "${item.product.name}".`
                );
              }
              const newStock = item.product.stock - item.quantity;
              await tx.product.update({
                where: { id: item.productId },
                data: {
                  stock: { decrement: item.quantity },
                  status: getNewStatus(newStock),
                },
              });
            }
          }
        }
      }

      const updatedOrder = await tx.order.update({
        where: { id },
        data: { status: newStatus },
        include: { customer: true, items: true },
      });

      return updatedOrder;
    });

    revalidatePath("/dashboard/orders");
    revalidatePath("/dashboard/products");

    return {
      data: updatedOrder,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function deleteOrderAction(deleteId: string) {
  if (!deleteId) {
    return {
      error: "ID do pedido não fornecido.",
    };
  }

  try {
    await prisma.order.delete({
      where: {
        id: deleteId,
      },
    });

    revalidatePath("/dashboard/orders");

    return { data: { message: "Pedido deletado com sucesso!" } };
  } catch (error) {
    return { error: String(error) };
  }
}
