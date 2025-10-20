export const formatCurrencyBrl = (priceInCents: number): string => {
  const cents = typeof priceInCents === "number" ? priceInCents : 0;

  const priceInReais = cents / 100;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceInReais);
};
