import { Column } from '@ant-design/plots';
import React, { useState } from 'react';
import "./style.css";

const data = [
  { day: 'Mon', amount: 2000 },
  { day: 'Tue', amount: 3000 },
  { day: 'Wed', amount: 7500 },
  { day: 'Thu', amount: 2100 },
  { day: 'Fri', amount: 1500 },
  { day: 'Sat', amount: 4500 },
  { day: 'Sun', amount: 150 },
];

const BarGraph = () => {
  const [expenseData,setExpenseData] = useState();
  const config = {
    data,
    xField: 'day',
    yField: 'amount',
    scale: {
        y: {
          domainMax: 5000,
          domainMin: 0,
        },
      },
    style: {
      fill: ({ day }) => {
        if (day === 'Sun' || day === 'Sat') {
          return '#22CBCC';
        }
        return '#2989FF';
      },
    },
    axis: {
        y: {
          labelFormatter: (val) => `${val}₹`,
        },
      },
    
    legend: false,
  };
  return <Column className='bar-div' {...config} />;
};

export default BarGraph;