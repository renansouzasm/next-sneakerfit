import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrencyBrl } from "@/utils/formatCurrencyBrl";
import { formatDate } from "@/utils/formatDate";
import { getLabelPtbr } from "@/utils/label";
import { OrderActions } from "./order-actions";
import type { OrderWithDetails } from "@/hooks/useOrder";

interface OrderRowProps {
  order: OrderWithDetails;
}

export function OrderRow({ order }: OrderRowProps) {
  return (
    <TableRow>
      <TableCell className="font-mono text-xs">
        {order.id.substring(0, 10)}...
      </TableCell>
      <TableCell className="capitalize">
        {order.customer?.name ?? "N/A"}
      </TableCell>
      <TableCell>{order.customer?.email ?? "N/A"}</TableCell>
      <TableCell>{formatCurrencyBrl(order.totalValue)}</TableCell>
      <TableCell>{getLabelPtbr(order.status!)}</TableCell>
      <TableCell>{formatDate(order.createdAt)}</TableCell>

      <TableCell className="flex justify-end">
        <OrderActions order={order} />
      </TableCell>
    </TableRow>
  );
}
