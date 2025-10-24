import { toast } from "sonner";

export function displaySuccessToast(message: string): void {
  toast.success(message, {
    className: "capitalize",
  });
}

export function displayErrorToast(message: string): void {
  toast.error(message, {
    className: "capitalize",
  });
}
