import { useNotification } from "../../containers/hooks/useNotification";
import type { NotificationType } from "../../containers/entities/entities";

const borderStyles: Record<NotificationType, string> = {
  success: "border-green-500",
  info:    "border-blue-500",
  error:   "border-red-500",
};

const iconStyles: Record<NotificationType, string> = {
  success: "text-green-500",
  info:    "text-blue-500",
  error:   "text-red-500",
};

const icons: Record<NotificationType, string> = {
  success: "check_circle",
  info:    "info",
  error:   "cancel",
};

export default function NotificationInterface() {
  const { notificationState, closeNotification } = useNotification();
  const { open, message, type } = notificationState;

  if (!open) return null;

  return (
    <div className="fixed top-[12vh] right-4 z-[300] animate-fadeIn">
      <div className={`flex items-start gap-3 px-4 py-3 rounded-lg border-l-4 shadow-xl min-w-64 max-w-80 bg-neutral-900 ${borderStyles[type]}`}>
        <i className={`material-symbols-outlined text-lg flex-shrink-0 ${iconStyles[type]}`}>{icons[type]}</i>
        <p className="text-sm flex-1 text-neutral-200">{message}</p>
        <button onClick={closeNotification} className="text-neutral-400 hover:text-neutral-200 transition-colors flex-shrink-0">
          <i className="material-symbols-outlined text-base">close</i>
        </button>
      </div>
    </div>
  );
}
