import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import useStore4 from '../store';

export default function Chart() {
  const { chartData } = useStore4();

  const keys = Object.keys(chartData[0]);

  console.log(keys);
  console.log(chartData);
  return (
    <>
      <LineChart width={500} height={300} data={chartData}>
        <XAxis dataKey={keys[0]} />
        <YAxis
          yAxisId="left"
          label={{
            value: '평균 기온(℃)',
            angle: -90,
            position: 'insideLeft',
            offset: 20
          }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{
            value: '평균 습도(%)',
            angle: -90,
            position: 'insideRight',
            offset: 20
          }}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Legend align="left" verticalAlign="top" />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey={keys[1]}
          name="평균 기온"
          stroke="#8884d8"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey={keys[2]}
          name="평균 습도"
          stroke="#82ca9d"
        />
      </LineChart>
    </>
  );
}
