import {
  Table,
  TableBody,
  TableCaption,
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
    <Table className="text-foreground">
      <TableCaption>Lista de produtos</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="px-6 py-4 text-foreground/50 capitalize font-bold">
            imagem
          </TableHead>
          <TableHead className="px-6 py-4 text-foreground/50 capitalize font-bold">
            nome
          </TableHead>
          <TableHead className="px-6 py-4 text-foreground/50 capitalize font-bold">
            marca
          </TableHead>
          <TableHead className="px-6 py-4 text-foreground/50 capitalize font-bold">
            preço
          </TableHead>
          <TableHead className="px-6 py-4 text-foreground/50 capitalize font-bold">
            estoque
          </TableHead>
          <TableHead className="px-6 py-4 text-foreground/50 capitalize font-bold">
            status
          </TableHead>
          <TableHead className="px-6 py-4 text-foreground/50 capitalize font-bold text-right">
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
  );
}
