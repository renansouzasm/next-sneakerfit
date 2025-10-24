import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductRow } from "./product-row";
import { Product } from "@prisma/client";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="bg-card/25 rounded-xl overflow-hidden">
      <Table className="text-foreground">
        <TableHeader>
          <TableRow>
            <TableHead className="text-foreground/50 px-6 py-4 capitalize font-bold">
              imagem
            </TableHead>
            <TableHead className="text-foreground/50 px-6 py-4 capitalize font-bold">
              nome
            </TableHead>
            <TableHead className="text-foreground/50 px-6 py-4 capitalize font-bold">
              marca
            </TableHead>
            <TableHead className="text-foreground/50 px-6 py-4 capitalize font-bold">
              preço
            </TableHead>
            <TableHead className="text-foreground/50 px-6 py-4 capitalize font-bold">
              estoque
            </TableHead>
            <TableHead className="text-foreground/50 px-6 py-4 capitalize font-bold">
              status
            </TableHead>
            <TableHead className="text-foreground/50 px-6 py-4 capitalize font-bold text-right">
              ações
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length > 0 &&
            products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
