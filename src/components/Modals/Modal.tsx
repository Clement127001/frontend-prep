import { useEffect } from "react";
import ModalStyles from "@/styles/Modal.module.css";
import { X } from "lucide-react";
import { ModalProps } from "@/types/common";

const Modal = ({
  opened,
  onCancel,
  content,
  title,
  description,
  shouldCloseOnClickOutside = true,
  onConfirm,
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (shouldCloseOnClickOutside && e.key === "Escape" && opened) {
        onCancel();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel, opened, shouldCloseOnClickOutside]);

  const handleClickOutside = () => {
    if (shouldCloseOnClickOutside) {
      onCancel();
    }
  };

  if (!opened) return null;

  return (
    <div className={ModalStyles.modalContainer} onClick={handleClickOutside}>
      <div
        className={ModalStyles.modalContent}
        role="dialog"
        aria-modal
        onClick={(e) => e.stopPropagation()}
      >
        <div className={ModalStyles.modalTitle}>
          {title && <h3>{title}</h3>}
          <X
            size={20}
            className={ModalStyles.modalCloseIcon}
            onClick={onCancel}
          />
        </div>
        {content ? (
          content
        ) : (
          <div>
            <p>{description}</p>

            <div className={ModalStyles.modalActions}>
              <button onClick={onCancel}>Cancel</button>
              <button onClick={onConfirm}>Confirm</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
