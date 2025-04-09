import {
  CheckCircle2,
  Info,
  MessageCircleWarning,
  X,
  XCircle,
} from "lucide-react";
import { ToastType } from "@/types/toast";
import ToastStyles from "@/styles/ToastStyles.module.css";

const iconStyles = { marginRight: "10px" };

const icons = {
  success: <CheckCircle2 style={iconStyles} />,
  info: <Info style={iconStyles} />,
  warning: <MessageCircleWarning style={iconStyles} />,
  failure: <XCircle style={iconStyles} />,
};

const Toast = ({
  type = "info",
  title,
  description,
  onClose,
}: {
  type: ToastType;
  title: string;
  description: string;
  onClose: () => void;
}) => {
  return (
    <div className={`${ToastStyles.toast} ${ToastStyles[type]}`}>
      {icons[type]}
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <X color="white" className={ToastStyles.closeBtn} onClick={onClose} />
    </div>
  );
};

export default Toast;
