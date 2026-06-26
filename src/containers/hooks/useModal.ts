import type { ReactNode } from "react";
import type { ModalFooterActionsType } from "../entities/entities";
import { usePortfolio } from "../states/portfolioProvider";
import { useNavigate, useLocation } from "react-router-dom";

type OpenModalOptions = {
  footerActions?: ModalFooterActionsType;
};

export function useModal() {
  const { getPortfolioState, setPortfolioState } = usePortfolio();
  const navigate = useNavigate();
  const location = useLocation();

  return {
    modal: {
      open: (title?: string, content?: ReactNode, options?: OpenModalOptions) => {
        setPortfolioState(s => ({ ...s, modal: { open: true, title, content, ...options } }));
        navigate({ pathname: location.pathname, search: "?modal=open" });
      },
      close: () => {
        setPortfolioState(s => ({ ...s, modal: { ...s.modal, open: false } }));
        if (new URLSearchParams(location.search).has("modal")) {
          navigate(-1);
        }
      },
    },
    modalState: getPortfolioState.modal,
  };
}
