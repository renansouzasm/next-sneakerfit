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
import { Product } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { useProductContext } from "../_context/ProductContext";

interface ProductDeleteDialogProps {
  product: Product;
  isDeleting: boolean;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
}

export function ProductDeleteDialog({
  product,
  isDeleting,
  setIsDeleting,
}: ProductDeleteDialogProps) {
  const { deleteProduct } = useProductContext();

  async function handleDelete() {
    try {
      await deleteProduct(product.id);
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
            Tem certeza que deseja deletar este produto? Esta ação não pode ser
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
