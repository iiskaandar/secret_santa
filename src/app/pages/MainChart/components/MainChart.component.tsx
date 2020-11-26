import React, { FunctionComponent } from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

const DashboardRender: FunctionComponent = () => (
  <Bar
    data={data}
    options={{
      title: {
        display: true,
        text: 'Average Rainfall per month',
        fontSize: 20,
      },
      legend: {
        display: true,
        position: 'right',
      },
    }}
  />
);

export default DashboardRender;