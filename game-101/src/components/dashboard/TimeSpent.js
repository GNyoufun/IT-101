import * as React from 'react';
import Link from '@mui/material/Link';
import {
    Chart,
    PieSeries
  } from '@devexpress/dx-react-chart-material-ui';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function MostWon() {
   const data = [
        { argument:'Monday', value:10 },
        { argument:'Tuesday', value:40 },
        { argument:'Wednesday', value:10 },
        { argument:'Thursday', value:20 },
        { argument:'Friday', value:20 },
    ];
  return (
    <React.Fragment>
      <Title>Time Spent</Title>
      <Chart
      data={data}
    >
      <PieSeries valueField="value" 
        argumentField="argument" 
        innerRadius={0.8} />
      </Chart>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Detail
        </Link>
      </div>
    </React.Fragment>
  );
}
