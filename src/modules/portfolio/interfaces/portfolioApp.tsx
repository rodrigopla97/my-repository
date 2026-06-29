import { BrowserRouter } from 'react-router-dom';
import HeaderInterface from '@app/modules/portfolio/interfaces/headerInterface';
import PortfolioProvider from '@app/modules/portfolio/states/portfolioProvider';
import RouteContent from '@app/modules/portfolio/interfaces/routeContentInterface';
import FooterCVInterface from '@app/modules/portfolio/interfaces/footerCVInterface';
import FooterInterface from '@app/modules/portfolio/interfaces/footerInterface';
import ModalInterface from '@app/modules/portfolio/interfaces/modalInterface';
import NotificationInterface from '@app/modules/portfolio/interfaces/notificationInterface';

export default function PortfolioApp() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <HeaderInterface />
        <RouteContent />
        <FooterInterface />
        <FooterCVInterface />
        <ModalInterface />
        <NotificationInterface />
      </BrowserRouter>
    </PortfolioProvider>
  );
}
