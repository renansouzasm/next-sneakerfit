import { Product } from "@/app.types";
import { ProductRow } from "./product-row";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[rgba(255,255,255,0.05)] font-semibold text-sm text-[#5c5c5c] md:text-xs">
          <th className="p-4 text-left">Imagem</th>
          <th className="p-4 text-left">Nome</th>
          <th className="p-4 text-left">Marca</th>
          <th className="p-4 text-left">Preço</th>
          <th className="p-4 text-left">Estoque</th>
          <th className="p-4 text-left">Status</th>
          <th className="p-4 text-left">Ações</th>
        </tr>
      </thead>
      
      <tbody>
        {products.map((product, index) => (
          <ProductRow key={index} product={product} />
        ))}
      </tbody>
    </table>
  );
}
