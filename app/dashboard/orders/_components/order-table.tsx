import { Order } from "@/app.types";
import { OrderRow } from "./order-row";

interface OrederTableProps {
  filtered: Order[];
}

export function OrderTable({ filtered }: OrederTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[rgba(255,255,255,0.05)] font-semibold text-sm text-[#5c5c5c] md:text-xs">
          <th className="p-4 text-left">ID</th>
          <th className="p-4 text-left">Cliente</th>
          <th className="p-4 text-left">Produto</th>
          <th className="p-4 text-left">Valor</th>
          <th className="p-4 text-left">Status</th>
          <th className="p-4 text-left">Data</th>
        </tr>
      </thead>

      <tbody>
        {filtered.map((order, index) => (
          <OrderRow key={index} order={order} />
        ))}
      </tbody>
    </table>
  );
}
