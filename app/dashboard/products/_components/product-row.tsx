import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrencyBrl } from "@/utils/formatCurrencyBrl";
import { getLabelFormat, getLabelPtbr } from "@/utils/label";
import { ProductThumb } from "./product-thumb";
import { ProductActions } from "./product-actions";
import { Product } from "@prisma/client";

interface ProductRowProps {
  product: Product;
}

export function ProductRow({ product }: ProductRowProps) {
  return (
    <TableRow>
      <TableCell className="px-6 py-4 capitalize">
        <ProductThumb thumb={product.thumbUrl} />
      </TableCell>

      <TableCell className="px-6 py-4 capitalize">{product.name}</TableCell>
      <TableCell className="px-6 py-4 capitalize">
        {getLabelFormat(product.brand)}
      </TableCell>
      <TableCell className="px-6 py-4 capitalize">
        {formatCurrencyBrl(product.price)}
      </TableCell>
      <TableCell className="px-6 py-4 capitalize">{product.stock}</TableCell>
      <TableCell className="px-6 py-4 capitalize">
        {getLabelPtbr(product.status!)}
      </TableCell>

      <TableCell className="px-6 py-4 capitalize flex justify-end">
        <ProductActions product={product} />
      </TableCell>
    </TableRow>
  );
}
