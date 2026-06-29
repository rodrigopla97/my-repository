import PortfolioModule from "@app/modules/portfolio/portfolioModule";
import PortfolioProvider from "@app/modules/portfolio/states/portfolioProvider";

export default function PortfolioModuleProvider() {
  return (
    <PortfolioProvider>
      <PortfolioModule />
    </PortfolioProvider>
  );
}
