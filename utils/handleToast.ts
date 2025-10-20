import { toast } from "sonner";

export function handleSuccessToast(message: string) {
  toast.success(message, {
    style: {
      backgroundColor: "#161b22",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.05)",
    },
  });
}

export function handleErrorToast(message: string) {
  toast.error(message, {
    style: {
      backgroundColor: "#161b22",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.05)",
    },
  });
}

export function handleInfoToast(message: string) {
  toast.info(message, {
    style: {
      backgroundColor: "#161b22",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.05)",
    },
  });
}

export function handleWarningToast(message: string) {
  toast.warning(message, {
    style: {
      backgroundColor: "#161b22",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.05)",
    },
  });
}
