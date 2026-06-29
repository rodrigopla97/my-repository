import HomeInterface from "@app/modules/portfolio/interfaces/home/homeInterface";
import HomeSummaryInterface from "@app/modules/portfolio/interfaces/home/homeSummaryInterface";
import React from "react";

export default function HomeModule() {
  return (
    <React.Fragment>
      <HomeInterface />
      <HomeSummaryInterface />
    </React.Fragment>
  );
}
