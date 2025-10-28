import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrencyBrl } from "@/utils/formatCurrencyBrl";
import { Product } from "@prisma/client";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ProductUpdateForm } from "./product-update-form";
import { ProductDeleteDialog } from "./product-delete-dialog";

interface RowProps {
  product: Product;
}

export function ProductRow({ product }: RowProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <TableRow key={product.id}>
      <TableCell>
        <div className="relative size-12 overflow-hidden rounded-md bg-gray-200">
          <Image
            className="object-contain"
            src={product.thumbUrl || "/placeholder.svg"}
            alt={product.name}
            fill
          />
        </div>
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.brand}</TableCell>
      <TableCell>{formatCurrencyBrl(product.price)}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>{product.status}</TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsUpdating(true)}
            >
              <Pencil />
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsDeleting(true)}
            >
              <Trash2 />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      <ProductUpdateForm
        product={product}
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
      />

      <ProductDeleteDialog
        product={product}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
    </TableRow>
  );
}
