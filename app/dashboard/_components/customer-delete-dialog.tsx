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
import { Customer } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { useCustomerContext } from "../_context/CustomerContext";

interface CustomerDeleteDialogProps {
  customer: Customer;
  isDeleting: boolean;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
}

export function CustomerDeleteDialog({
  customer,
  isDeleting,
  setIsDeleting,
}: CustomerDeleteDialogProps) {
  const { deleteCustomer } = useCustomerContext();

  async function handleDelete() {
    try {
      await deleteCustomer(customer.id);
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
            Tem certeza que deseja deletar este cliente? Esta ação não pode ser
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
