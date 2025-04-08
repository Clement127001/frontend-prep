import { useCallback, useState } from "react";
import ToastStyles from "@/styles/ToastStyles.module.css";
import { ToastData, ToastPostion } from "@/types/toast";
import Toast from "@/components/toast/Toast";

const useToast = ({ position }: { position: ToastPostion }) => {
  const [toast, setToast] = useState<ToastData | null>(null);

  const onCloseToast = () => {
    setToast(null);
  };

  const showToast = useCallback((toastProps: ToastData) => {
    let timer;
    if (timer) clearTimeout(timer);
    setToast(toastProps);
    timer = setTimeout(() => {
      onCloseToast();
    }, toastProps.duration);
  }, []);

  const ToastComponent = toast ? (
    <div className={`${ToastStyles[position]}`}>
      <Toast {...toast} onClose={() => setToast(null)} />
    </div>
  ) : null;
  return { ToastComponent, showToast };
};

export default useToast;
