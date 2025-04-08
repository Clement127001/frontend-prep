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
};
