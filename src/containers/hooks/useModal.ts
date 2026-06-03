import type { ReactNode } from "react";
import type { ModalFooterActionsType } from "../entities/entities";
import { usePortfolio } from "../states/portfolioProvider";

type OpenModalOptions = {
  footerActions?: ModalFooterActionsType;
};

export function useModal() {
  const { getPortfolioState, setPortfolioState } = usePortfolio();

  return {
    modal: {
      open: (title?: string, content?: ReactNode, options?: OpenModalOptions) =>
        setPortfolioState(s => ({ ...s, modal: { open: true, title, content, ...options } })),
      close: () =>
        setPortfolioState(s => ({ ...s, modal: { ...s.modal, open: false } })),
    },
    modalState: getPortfolioState.modal,
  };
}
