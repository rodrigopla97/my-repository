import React, { createContext, useContext } from 'react';
import { ProviderProps, TabdataContextType, TabdataItem } from '../entities/entities';

import HomePage from '../routes/main/mainPage';
import AboutPage from '../routes/about/aboutPage';
import ContactPage from '../routes/contact/contactPage';

export const TabdataContext = createContext<TabdataContextType | null>(null);

export const TabdataProvider: React.FC<ProviderProps> = ({ children }) => {
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

  return (
    <TabdataContext.Provider value={{ tabdataItems }}>
      {children}
    </TabdataContext.Provider>
  );
};

export function useTabData() {
  return useContext(TabdataContext) as TabdataContextType;
}
