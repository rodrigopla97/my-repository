import React from 'react';
import HomeInterface from '../../components/interfaces/main/homeInterface';
import ComingSoonInterface from '../../components/interfaces/main/comingSoonInterface';

export default function MainPage() {
  return (
    <React.Fragment>
      <HomeInterface />
      <ComingSoonInterface />
    </React.Fragment>
  );
}
