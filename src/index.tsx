import "./index.css";
import ReactDOM from "react-dom/client";
import PortfolioApp from '@app/modules/portfolio/interfaces/portfolioApp';

document.addEventListener('dragstart', e => {
  if (e.target instanceof HTMLImageElement) e.preventDefault();
});
document.addEventListener('contextmenu', e => {
  if (e.target instanceof HTMLImageElement) e.preventDefault();
}, { passive: false });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <PortfolioApp />
);
