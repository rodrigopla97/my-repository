import type { PortfolioContextType } from "@app/modules/portfolio/entities/entities";
import { createContext } from "react";

export const PortfolioContext = createContext<PortfolioContextType | null>(null);
