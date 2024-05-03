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
  console.log(Object.keys(props.data[0]));
  const keys = Object.keys(props.data[0]);
  return (
    <LineChart width={500} height={300} data={props.data}>
      <XAxis dataKey={keys[0]} />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line yAxisId="left" type="monotone" dataKey={keys[1]} stroke="#8884d8" />
      <Line yAxisId="right" type="monotone" dataKey={keys[2]} stroke="#82ca9d" />
    </LineChart>
  );
}
