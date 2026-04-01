import { createContext } from 'react';
import { PortfolioContextType } from '../entities/entities';

export const PortfolioContext = createContext<PortfolioContextType | null>(null);
