import { BrowserRouter } from 'react-router-dom';
import HeaderInterface from '../components/interfaces/headerInterface';
import FooterInterface from '../components/interfaces/footerInterface';
import { ThemeProvider } from '../context/themeContext';
import RouteContent from '../components/interfaces/routeContentInterface';

export default function RoutesProvider() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <HeaderInterface />
        <RouteContent />
        <FooterInterface />
      </BrowserRouter>
    </ThemeProvider>
  );
}
