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
import { Task } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { useTaskContext } from "../_context/TaskContext";

interface TaskDeleteDialogProps {
  task: Task;
  isDeleting: boolean;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
}

export function TaskDeleteDialog({
  task,
  isDeleting,
  setIsDeleting,
}: TaskDeleteDialogProps) {
  const { deleteTask } = useTaskContext();

  async function handleDelete() {
    try {
      await deleteTask(task.id);
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
            Tem certeza que deseja deletar essa tarefa? Esta ação não pode ser
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
