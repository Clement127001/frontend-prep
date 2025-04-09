export type ToastPostion =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type ToastType = "success" | "info" | "failure" | "warning";

export type ToastData = {
  title: string;
  description: string;
  duration?: number;
  type: ToastType;
  position: ToastPostion;
};

export type ToastContextType = {
  toastData: ToastData | null;
  showToast: (toastProps: ToastData) => void;
  hideToast: () => void;
};
