import { Product } from "@prisma/client";

interface CartProduct extends Product {
  quantity: number;
}

interface GenerateWhatsAppLinkProps {
  phone: string;
  address: string;
  cartProducts: CartProduct[];
}

export function generateWhatsappLink({
  phone,
  address,
  cartProducts,
}: GenerateWhatsAppLinkProps): string {
  if (!cartProducts.length) {
    throw new Error("O carrinho está vazio.");
  }

  if (!address.trim()) {
    throw new Error("O endereço é obrigatório.");
  }

  const messageBody = cartProducts
    .map(
      (product) =>
        `• ${product.name}\nQtd: ${product.quantity}\nPreço: R$ ${(
          product.price / 100
        ).toFixed(2)}\n`
    )
    .join("\n");

  const total = cartProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const fullMessage = `🛍 *Novo Pedido*\n\n${messageBody}\n*Total:* R$ ${(
    total / 100
  ).toFixed(2)}\n\n*Endereço:* ${address}`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;
}
