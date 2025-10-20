import { Customer } from "@/app.types";
import { CustomerRow } from "./customer-row";

interface CustomerTableProps {
  customers: Customer[];
}

export function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[rgba(255,255,255,0.05)] font-semibold text-sm text-[#5c5c5c] md:text-xs">
          <th className="p-4 text-left">Avatar</th>
          <th className="p-4 text-left">Nome</th>
          <th className="p-4 text-left">Email</th>
          <th className="p-4 text-left">Pedidos</th>
          <th className="p-4 text-left">Data</th>
          <th className="p-4 text-left">Ações</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer, index) => (
          <CustomerRow key={index} customer={customer} />
        ))}
      </tbody>
    </table>
  );
}
