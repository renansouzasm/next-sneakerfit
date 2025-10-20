import { Product } from "@/app.types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { formatCurrencyBrl } from "@/utils/formatCurrencyBrl";
import { getLabelPtbr } from "@/utils/label";
import { getBadgeClass } from "@/utils/badge";
import avatar from "@/public/avatar.jpg";
import Link from "next/link";

export function ProductRow({ product }: { product: Product }) {
  return (
    <tr className="border-b border-[#252424] last:border-b-0 md:text-xs">
      <td className="p-4">
        <Image
          src={product.imageUrl || avatar}
          alt={product.name}
          width={32}
          height={32}
          className="rounded-md border border-[#1f1f1f] object-cover"
        />
      </td>
      <td className="p-4 capitalize">{product.name}</td>
      <td className="p-4 capitalize">
        {" "}
        <span
          className={`px-3 py-1 rounded-[20px] text-xs font-medium ${getBadgeClass(
            "brand",
            product.brand
          )}`}
        >
          {product.brand}
        </span>
      </td>
      <td className="p-4">{formatCurrencyBrl(product.price)}</td>
      <td className="p-4">{product.stock}</td>
      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-[20px] text-xs font-medium ${getBadgeClass(
            "status",
            product.status
          )}`}
        >
          {getLabelPtbr(product.status)}
        </span>
      </td>
      <td className="p-4">
        <Button className="bg-blue-500/30 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 cursor-pointer">
          <Link
            href={`${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/products/${product.id}/edit`}
          >
            <Edit2 />
          </Link>
        </Button>
      </td>
    </tr>
  );
}
