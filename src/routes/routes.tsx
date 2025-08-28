import { BrowserRouter } from 'react-router-dom';
import HeaderInterface from '../components/interfaces/headerInterface';
import FooterInterface from '../components/interfaces/footerInterface';
import { ThemeProvider } from '../context/themeContext';
import RouteContent from '../components/interfaces/routeContentInterface';
import { TabdataProvider } from '../context/tabdataContext';
import FooterCVInterface from '../components/interfaces/footerCVInterface';

export default function RoutesProvider() {
  return (
    <ThemeProvider>
      <TabdataProvider>
        <BrowserRouter>
          <HeaderInterface />
          <RouteContent />
          <FooterInterface />
          <FooterCVInterface />
        </BrowserRouter>
      </TabdataProvider>
    </ThemeProvider>
  );
}
