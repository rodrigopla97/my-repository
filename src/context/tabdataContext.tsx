import React, { createContext, useContext, useState } from 'react';
import { ProviderProps, TabdataContextType, TabdataItem } from '../entities/entities';

import HomePage from '../routes/main/mainPage';
import AboutPage from '../routes/about/aboutPage';
import ContactPage from '../routes/contact/contactPage';

export const TabdataContext = createContext<TabdataContextType | null>(null);

export const TabdataProvider: React.FC<ProviderProps> = ({ children }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false)

  const tabdataItems: TabdataItem[] = [
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
    <TabdataContext.Provider value={{ tabdataItems, handleSetIsMenuOpen, isMenuOpen, handleSetIsCurriculumOpen, isCurriculumOpen }}>
      {children}
    </TabdataContext.Provider>
  );
};

export function useTabData() {
  return useContext(TabdataContext) as TabdataContextType;
}
