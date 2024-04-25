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
function getDayName(date = new Date(), locale = "en-US") {
  return date.toLocaleDateString(locale, { weekday: "long" });
}


const BarGraph = ({barData}) => {
  const [expenseData,setExpenseData] = useState();
  const realBarData = []
  barData.map((val,index)=>{
const dayName= getDayName(new Date(val.date))
    realBarData.push({item:val.title, amount:val.amount})
  })
  const config = {
    data:realBarData,
    xField: 'item',
    yField: 'amount',
    scale: {
        y: {
          domainMax: 2000,
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