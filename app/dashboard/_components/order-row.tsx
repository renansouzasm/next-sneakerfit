import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { Order } from "@prisma/client";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrencyBrl } from "@/utils/formatCurrencyBrl";
import { OrderUpdateForm } from "./order-update-form";
import { OrderDeleteDialog } from "./order-delete-dialog";

interface OrderRowProp {
  order: Order;
}

export function OrderRow({ order }: OrderRowProp) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <TableRow key={order.id}>
      <TableCell className="font-mono text-sm">#{order.id}</TableCell>
      <TableCell className="font-semibold">
        {formatCurrencyBrl(order.totalValue)}
      </TableCell>
      <TableCell>{order.status}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(order.createdAt)}
      </TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-4" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => setIsUpdating(true)}>
              <Pencil className="mr-2 size-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsDeleting(true)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 size-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      <OrderUpdateForm
        order={order}
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
      />

      <OrderDeleteDialog
        order={order}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
    </TableRow>
  );
}
