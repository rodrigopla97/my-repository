import "./index.css";
import ReactDOM from "react-dom/client";
import RoutesProvider from "./routes/routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RoutesProvider />
);
