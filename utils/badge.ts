const badge = {
  base: "capitalize px-3 py-1 rounded-full font-medium",
  variants: {
    status: {
      AVAILABLE: "bg-green/20 text-green",
      LOW_STOCK: "bg-yellow/20 text-yellow",
      NO_STOCK: "bg-red/20 text-red",

      PROCESSING: "bg-blue/20 text-blue",
      COMPLETEED: "bg-green/20 text-green",
      CANCELED: "bg-red/20 text-red",

      ACTIVE: "bg-green/20 text-green",
      VACATION: "bg-yelow/20 text-yelow",

    },
    brand: {
      nike: "bg-orange/20 text-orange",
      adidas: "bg-blue/20 text-blue",
      "new-balance": "bg-red/20 text-red",
    },
  },
} as const;

export type BadgeVariant = keyof typeof badge.variants;
export type VariantKey<T extends BadgeVariant> =
  keyof (typeof badge.variants)[T];

export function getBadgeClass<T extends BadgeVariant>(
  variant: T,
  key: VariantKey<T>
): string {
  const badgeClass = badge.variants[variant][key] ?? "bg-purple/20 text-purple";

  return `${badge.base} ${badgeClass}`;
}
