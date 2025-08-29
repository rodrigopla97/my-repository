import React, { createContext, useContext, useState } from 'react';
import { ActionsContextType, ActionsTabdataItem, ProviderProps } from '../entities/entities';

import HomePage from '../routes/main/mainPage';
import AboutPage from '../routes/about/aboutPage';
import ContactPage from '../routes/contact/contactPage';

export const ActionsContext = createContext<ActionsContextType | null>(null);

export const ActionsProvider: React.FC<ProviderProps> = ({ children }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false)

  const tabdataItems: ActionsTabdataItem[] = [
    {
      path: '/',
      name: 'Home',
      icon: 'home',
      component: <HomePage />,
    },
    {
      path: '/about',
      name: 'About',
      icon: 'description',
      component: <AboutPage />,
    },
    {
      path: '/contact',
      name: 'Contact',
      icon: 'contact_phone',
      component: <ContactPage />,
    },
  ];

  function handleSetIsMenuOpen(isOpen: boolean) {
    setIsMenuOpen(isOpen);
  }

  function handleSetIsCurriculumOpen(isOpen: boolean) {
    setIsCurriculumOpen(isOpen);
  }

  return (
    <ActionsContext.Provider value={{ tabdataItems, handleSetIsMenuOpen, isMenuOpen, handleSetIsCurriculumOpen, isCurriculumOpen }}>
      {children}
    </ActionsContext.Provider>
  );
};

export function useActions() {
  return useContext(ActionsContext) as ActionsContextType;
}
