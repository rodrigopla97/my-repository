import { usePortfolio } from '@app/modules/portfolio/states/portfolioProvider';

export function useCurriculum() {
  const { getPortfolioState, setPortfolioState } = usePortfolio();
  const { isCurriculumOpen } = getPortfolioState;

  function setCurriculumOpen(isOpen: boolean) {
    setPortfolioState(state => ({ ...state, isCurriculumOpen: isOpen }));
  }

  return { isCurriculumOpen, setCurriculumOpen };
}
