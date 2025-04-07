import { ReactNode } from "react";

export type ModalProps = {
  opened: boolean;
  shouldCloseOnClickOutside?: boolean;
  title: string;
  content?: ReactNode;
  onCancel: () => void;
  description?: string;
  onConfirm?: () => void;
};
