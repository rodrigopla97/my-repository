import { createContext } from 'react';
import type { PortfolioContextType } from '@app/modules/portfolio/entities/entities';

export const PortfolioContext = createContext<PortfolioContextType | null>(null);
