import React from 'react';
import HomeInterface from '@app/modules/portfolio/interfaces/home/homeInterface';
import HomeSummaryInterface from '@app/modules/portfolio/interfaces/home/homeSummaryInterface';

export default function HomeModule() {
  return (
    <React.Fragment>
      <HomeInterface />
      <HomeSummaryInterface />
    </React.Fragment>
  );
}
