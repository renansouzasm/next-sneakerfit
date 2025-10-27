"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProductContext } from "../_context/ProductContext";
import { ProductRow } from "./product-row";

export function ProductTable() {
  const { products } = useProductContext();

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-16"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length &&
            products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
