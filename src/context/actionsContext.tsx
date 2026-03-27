import React, { createContext, useContext, useState } from 'react';
import {
  ActionsContextType,
  ActionsTabdataItem,
  ProviderProps,
} from '../entities/entities';

const defaultContext: ActionsContextType = {
  tabdataItems: [
    { path: '/', name: 'Home', icon: 'home' },
    { path: '/about', name: 'About', icon: 'description' },
    { path: '/contact', name: 'Contact', icon: 'contact_phone' },
  ],
  isMenuOpen: false,
  handleSetIsMenuOpen: () => { },
  isCurriculumOpen: false,
  handleSetIsCurriculumOpen: () => { },
};

export const ActionsContext = createContext<ActionsContextType>(defaultContext)

export const ActionsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);

  const tabdataItems: ActionsTabdataItem[] = defaultContext.tabdataItems;

  function handleSetIsMenuOpen(isOpen: boolean) { setIsMenuOpen(isOpen); }
  function handleSetIsCurriculumOpen(isOpen: boolean) { setIsCurriculumOpen(isOpen); }

  return (
    <ActionsContext.Provider value={{
      tabdataItems,
      isMenuOpen,
      handleSetIsMenuOpen,
      isCurriculumOpen,
      handleSetIsCurriculumOpen,
    }}>
      {children}
    </ActionsContext.Provider>
  );
};

export function useActions() {
  return useContext(ActionsContext) as ActionsContextType;
}
