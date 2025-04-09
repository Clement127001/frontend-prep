import Toast from "@/components/toast/Toast";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { ToastContextType, ToastData } from "@/types/toast";
import ToastStyles from "@/styles/ToastStyles.module.css";

const ToastContext = createContext<ToastContextType>({
  toastData: null,
  showToast: () => {},
  hideToast: () => {},
});

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastData, setToastData] = useState<ToastData | null>(null);

  const showToast = useCallback((toastProps: ToastData) => {
    let timer;
    if (timer) clearTimeout(timer);
    setToastData(toastProps);
    timer = setTimeout(() => {
      hideToast();
    }, toastProps.duration ?? 3000);
  }, []);

  const hideToast = () => {
    setToastData(null);
  };

  return (
    <ToastContext.Provider value={{ toastData, showToast, hideToast }}>
      {children}
      {toastData && (
        <div className={`${ToastStyles[toastData.position]}`}>
          <Toast {...toastData} onClose={hideToast} />
        </div>
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => useContext(ToastContext);
