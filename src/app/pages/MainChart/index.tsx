import React from 'react';
import MainChart from './components/MainChart.component';
import MainChartState from './store/state';

const MainChartPage = () => (
  <MainChartState>
    <MainChart />
  </MainChartState>
);

export default MainChartPage;
