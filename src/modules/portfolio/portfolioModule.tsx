import FooterCVInterface from "@app/modules/portfolio/interfaces/footerCVInterface";
import FooterInterface from "@app/modules/portfolio/interfaces/footerInterface";
import HeaderInterface from "@app/modules/portfolio/interfaces/headerInterface";
import ModalInterface from "@app/modules/portfolio/interfaces/modalInterface";
import NotificationInterface from "@app/modules/portfolio/interfaces/notificationInterface";
import RouteContent from "@app/modules/portfolio/interfaces/routeContentInterface";
import SyncOverlayInterface from "@app/modules/portfolio/interfaces/syncOverlayInterface";

export default function PortfolioModule() {
  return (
    <>
      <HeaderInterface />
      <RouteContent />
      <FooterInterface />
      <FooterCVInterface />
      <SyncOverlayInterface />
      <ModalInterface />
      <NotificationInterface />
    </>
  );
}
