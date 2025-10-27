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
import { Employee } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { useEmployeeContext } from "../_context/EmployeeContext";

interface EmployeeDeleteDialogProps {
  employee: Employee;
  isDeleting: boolean;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
}

export function EmployeeDeleteDialog({
  employee,
  isDeleting,
  setIsDeleting,
}: EmployeeDeleteDialogProps) {
  const { deleteEmployee } = useEmployeeContext();

  async function handleDelete() {
    try {
      await deleteEmployee(employee.id);
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
            Tem certeza que deseja deletar este funcionário? Esta ação não pode
            ser desfeita.
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
