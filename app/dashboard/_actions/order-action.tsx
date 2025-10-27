"use server";

import {
  orderCreateSchema,
  OrderCreateForm,
  orderUpdateSchema,
  OrderUpdateForm,
} from "@/lib/schemas/order-schema";
import { revalidatePath } from "next/cache";
import { Prisma, ProductStatus, OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const ORDERS_PATH = "/dashboard/orders";

function getNewStatus(stock: number): ProductStatus {
  if (stock <= 0) return ProductStatus.NO_STOCK;
  if (stock <= 5) return ProductStatus.LOW_STOCK;
  return ProductStatus.AVAILABLE;
}

async function getFullOrderDetailsById(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function getOrdersAction() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        items: {
          select: { id: true },
        },
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
    const order = await getFullOrderDetailsById(getOrderId);
    return {
      data: order,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function createOrderAction(formData: OrderCreateForm) {
  const validation = orderCreateSchema.safeParse(formData);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
    };
  }

  const { customerId, items } = validation.data;

  try {
    const newOrder = await prisma.$transaction(async (tx) => {
      const productIds = items.map((item) => item.productId);
      const products = await tx.product.findMany({
        where: { id: { in: productIds } },
      });

      let totalValue = 0;
      const stockUpdates: Promise<unknown>[] = [];
      const orderItemsData: Prisma.OrderItemCreateManyOrderInput[] = [];

      for (const item of items) {
        const product = products.find((p) => p.id === item.productId);

        if (!product) {
          throw new Error(`Produto com ID ${item.productId} não encontrado.`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Estoque insuficiente para "${product.name}".`);
        }

        const newStock = product.stock - item.quantity;
        const newStatus = getNewStatus(newStock);

        totalValue += product.price * item.quantity;
        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          itemName: product.name,
          itemPrice: product.price,
        });

        stockUpdates.push(
          tx.product.update({
            where: { id: product.id },
            data: {
              stock: newStock,
              status: newStatus,
            },
          })
        );
      }

      const createdOrder = await tx.order.create({
        data: {
          customerId,
          totalValue,
          status: OrderStatus.PROCESSING,
          items: {
            createMany: {
              data: orderItemsData,
            },
          },
        },
      });

      await Promise.all(stockUpdates);

      return createdOrder;
    });

    revalidatePath(ORDERS_PATH);

    const createdOrderWithData = await getFullOrderDetailsById(newOrder.id);
    return {
      data: createdOrderWithData,
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

  const { id: updateId, status } = validation.data;

  try {
    if (status === OrderStatus.CANCELED) {
      await prisma.$transaction(async (tx) => {
        const orderToCancel = await tx.order.findUnique({
          where: { id: updateId },
          include: { items: true },
        });

        if (!orderToCancel) {
          throw new Error("Pedido não encontrado.");
        }

        if (orderToCancel.status !== OrderStatus.CANCELED) {
          const stockRestoreUpdates: Promise<unknown>[] = [];

          for (const item of orderToCancel.items) {
            if (item.productId) {
              const productStock = await tx.product.findUnique({
                where: { id: item.productId },
                select: { stock: true },
              });

              const newStock = (productStock?.stock ?? 0) + item.quantity;
              const newStatus = getNewStatus(newStock);

              stockRestoreUpdates.push(
                tx.product.update({
                  where: { id: item.productId },
                  data: {
                    stock: { increment: item.quantity },
                    status: newStatus,
                  },
                })
              );
            }
          }
          await Promise.all(stockRestoreUpdates);
        }

        await tx.order.update({
          where: { id: updateId },
          data: { status: OrderStatus.CANCELED },
        });
      });
    } else {
      await prisma.order.update({
        where: { id: updateId },
        data: { status },
      });
    }

    revalidatePath(ORDERS_PATH);

    const updatedOrderWithData = await getFullOrderDetailsById(updateId);
    return {
      data: updatedOrderWithData,
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
    await prisma.$transaction([
      prisma.orderItem.deleteMany({ where: { orderId: deleteId } }),
      prisma.order.delete({ where: { id: deleteId } }),
    ]);

    revalidatePath(ORDERS_PATH);

    return { data: { message: "Pedido deletado com sucesso!" } };
  } catch (error) {
    return { error: String(error) };
  }
}
