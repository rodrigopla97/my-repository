import type { NotificationType } from "@app/modules/portfolio/entities/entities";
import { useNotification } from "@app/modules/portfolio/hooks/useNotification";

const borderStyles: Record<NotificationType, string> = {
  success: "border-green-500",
  info: "border-blue-500",
  error: "border-red-500"
};

const iconStyles: Record<NotificationType, string> = {
  success: "text-green-500",
  info: "text-blue-400",
  error: "text-red-500"
};

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      className="w-5 h-5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      className="w-5 h-5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function NotifIcon({ type }: { type: NotificationType }) {
  const cls = iconStyles[type];
  if (type === "success")
    return (
      <span className={cls}>
        <CheckIcon />
      </span>
    );
  if (type === "info")
    return (
      <span className={cls}>
        <InfoIcon />
      </span>
    );
  return (
    <span className={cls}>
      <ErrorIcon />
    </span>
  );
}

export default function NotificationInterface() {
  const { notificationState, closeNotification } = useNotification();
  const { open, message, type } = notificationState;

  if (!open) return null;

  return (
    <div className="fixed top-[3vh] right-8 z-50 animate-fadeIn">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 bg-neutral-900 shadow-xl min-w-64 max-w-xs ${borderStyles[type]}`}
      >
        <NotifIcon type={type} />
        <p className="text-sm flex-1 text-neutral-200">{message}</p>
        <button
          type="button"
          onClick={closeNotification}
          className="text-neutral-400 hover:text-neutral-200 transition-colors flex-shrink-0"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
