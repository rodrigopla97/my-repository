import "./index.css";
import PortfolioModuleProvider from "@app/modules/portfolio/portfolioModuleProvider";
import ReactDOM from "react-dom/client";

document.addEventListener("dragstart", (e) => {
  if (e.target instanceof HTMLImageElement) e.preventDefault();
});
document.addEventListener(
  "contextmenu",
  (e) => {
    if (e.target instanceof HTMLImageElement) e.preventDefault();
  },
  { passive: false }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <PortfolioModuleProvider />
);
