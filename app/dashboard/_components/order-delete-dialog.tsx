import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { displayErrorToast } from "@/utils/displayToast";
import { Order } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { useOrderContext } from "../_context/OrderContext";

interface OrderDeleteDialogProps {
  order: Order;
  isDeleting: boolean;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
}

export function OrderDeleteDialog({
  order,
  isDeleting,
  setIsDeleting,
}: OrderDeleteDialogProps) {
  const { deleteOrder } = useOrderContext();

  async function handleDelete() {
    try {
      await deleteOrder(order.id);
    } catch (error) {
      displayErrorToast(String(error));
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja deletar este pedido? Esta ação não pode ser
            desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            className="cursor-pointer"
            onClick={() => setIsDeleting(false)}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleDelete}>
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
