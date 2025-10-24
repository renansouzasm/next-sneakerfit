import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderRow } from "./order-row";
import type { OrderWithDetails } from "@/hooks/useOrder";

interface OrderTableProps {
  orders: OrderWithDetails[];
}

export function OrderTable({ orders }: OrderTableProps) {
  return (
    <Table className="rounded-md overflow-hidden">
      <TableCaption>Lista de pedidos</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="capitalize">ID Pedido</TableHead>
          <TableHead className="capitalize">Cliente</TableHead>
          <TableHead className="capitalize">Email</TableHead>
          <TableHead className="capitalize">Total</TableHead>
          <TableHead className="capitalize">Status</TableHead>
          <TableHead className="capitalize">Data</TableHead>
          <TableHead className="capitalize text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.length > 0 &&
          orders.map((order) => <OrderRow key={order.id} order={order} />)}
      </TableBody>
    </Table>
  );
}
