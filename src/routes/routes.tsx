import { BrowserRouter } from 'react-router-dom';
import HeaderInterface from '../components/interfaces/headerInterface';
import PortfolioProvider from '../containers/states/portfolioProvider';
import RouteContent from '../components/interfaces/routeContentInterface';
import FooterCVInterface from '../components/interfaces/footerCVInterface';
import FooterInterface from '../components/interfaces/footerInterface';
import ModalInterface from '../components/interfaces/modalInterface';
import NotificationInterface from '../components/interfaces/notificationInterface';

export default function RoutesProvider() {
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
