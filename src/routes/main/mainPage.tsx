import React from 'react';
import HomeInterface from '../../components/interfaces/main/homeInterface';
import HomeSummaryInterface from '../../components/interfaces/main/homeSummaryInterface';

export default function MainPage() {
  return (
    <React.Fragment>
      <HomeInterface />
      <HomeSummaryInterface />
    </React.Fragment>
  );
}
