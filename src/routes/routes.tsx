import { BrowserRouter } from 'react-router-dom';
import HeaderInterface from '../components/interfaces/headerInterface';
import { ThemeProvider } from '../context/themeContext';
import RouteContent from '../components/interfaces/routeContentInterface';
import { ActionsProvider } from '../context/actionsContext';
import FooterCVInterface from '../components/interfaces/footerCVInterface';
import FooterInterface from '../components/interfaces/footerInterface';

export default function RoutesProvider() {
  return (
    <ThemeProvider>
      <ActionsProvider>
        <BrowserRouter>
          <HeaderInterface />
          <RouteContent />
          <FooterInterface />
          <FooterCVInterface />
        </BrowserRouter>
      </ActionsProvider>
    </ThemeProvider>
  );
}
