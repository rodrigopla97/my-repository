import type { ReactNode } from "react";
import { usePortfolio } from "../states/portfolioProvider";

export function useModal() {
  const { getPortfolioState, setPortfolioState } = usePortfolio();

  return {
    modal: {
      open: (title?: string, content?: ReactNode) =>
        setPortfolioState(s => ({ ...s, modal: { open: true, title, content } })),
      close: () =>
        setPortfolioState(s => ({ ...s, modal: { ...s.modal, open: false } })),
    },
    modalState: getPortfolioState.modal,
  };
}
