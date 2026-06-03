import type { NotificationType } from "../entities/entities";
import { usePortfolio } from "../states/portfolioProvider";

export function useNotification() {
  const { getPortfolioState, setPortfolioState } = usePortfolio();

  function show(message: string, type: NotificationType) {
    setPortfolioState(s => ({ ...s, notification: { open: true, message, type } }));
    setTimeout(() => {
      setPortfolioState(s => ({ ...s, notification: { ...s.notification, open: false } }));
    }, 4000);
  }

  return {
    notification: {
      success: (message: string) => show(message, 'success'),
      info:    (message: string) => show(message, 'info'),
      error:   (message: string) => show(message, 'error'),
    },
    notificationState: getPortfolioState.notification,
    closeNotification: () => setPortfolioState(s => ({ ...s, notification: { ...s.notification, open: false } })),
  };
}
