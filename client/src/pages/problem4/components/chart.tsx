import React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

export type ChartDataType = {
  //월, 평균기온, 평균습도
  month: string;
  temperature: number;
  humidity: number;
};

interface ChartProps {
  data: ChartDataType[];
}

export default function Chart(props: ChartProps) {
  return (
    <LineChart width={500} height={300} data={props.data}>
      <XAxis dataKey="month" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
      <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
    </LineChart>
  );
}
