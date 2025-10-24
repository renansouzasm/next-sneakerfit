import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomerRow } from "./customer-row";
import { Customer } from "@prisma/client";

interface CustomerTableProps {
  customers: Customer[];
}

export function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <Table className="rounded-md overflow-hidden">
      <TableCaption>Lista de clientes</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="capitalize">avatar</TableHead>
          <TableHead className="capitalize">nome</TableHead>
          <TableHead className="capitalize">email</TableHead>
          <TableHead className="capitalize text-right">ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {customers.length > 0 &&
          customers.map((customer) => (
            <CustomerRow key={customer.id} customer={customer} />
          ))}
      </TableBody>
    </Table>
  );
}
