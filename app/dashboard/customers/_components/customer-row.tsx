import { TableCell, TableRow } from "@/components/ui/table";
import { CustomerAvatar } from "./customer-avatar";
import { CustomerActions } from "./customer-actions";
import { Customer } from "@prisma/client";

interface CustomerRowProps {
  customer: Customer;
}

export function CustomerRow({ customer }: CustomerRowProps) {
  return (
    <TableRow>
      <TableCell>
        <CustomerAvatar avatarUrl={customer.avatarUrl} />
      </TableCell>
      <TableCell className="capitalize">{customer.name}</TableCell>
      <TableCell>{customer.email}</TableCell>

      <TableCell className="flex justify-end">
        <CustomerActions customer={customer} />
      </TableCell>
    </TableRow>
  );
}
