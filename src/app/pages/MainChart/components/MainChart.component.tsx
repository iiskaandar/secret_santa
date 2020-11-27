import React, { FunctionComponent, useContext, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { OneDayType } from '@namespace/country';
import Context from '../store/context';

interface ActiveDate {
  labels: string[];
  datasets: [
    {
      label: string;
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
      data: number[];
    },
  ];
}

const activeData: ActiveDate = {
  labels: [],
  datasets: [
    {
      label: 'Active',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [],
    },
  ],
};

const MainChartRender: FunctionComponent = () => {
  const MainChartContext = useContext(Context);
  const { getData, data } = MainChartContext;

  useEffect(() => {
    if (getData) {
      getData();
    }
  }, []);
  if (data) {
    data.forEach(({ Active, Date }: OneDayType) => {
      activeData.labels.push(Date);
      activeData.datasets[0].data.push(Active);
    });
  }

  return (
    <div>
      {data && (
        <Bar
          data={activeData}
          options={{
            title: {
              display: true,
              text: data[0].Country,
              fontSize: 20,
            },
            legend: {
              display: true,
              position: 'right',
            },
          }}
        />
      )}
    </div>
  );
};

export default MainChartRender;
