import Chart, { ChartDataType } from './components/chart';

export default function Problem4() {
  const data: ChartDataType[] = [
    { month: '1월', temperature: 4000, humidity: 2400 },
    { month: '2월', temperature: 3000, humidity: 1398 },
    { month: '3월', temperature: 2000, humidity: 9800 },
    { month: '4월', temperature: 2780, humidity: 3908 },
    { month: '5월', temperature: 2780, humidity: 3908 },
    { month: '6월', temperature: 2780, humidity: 3908 },
    { month: '7월', temperature: 2780, humidity: 3908 },
    { month: '8월', temperature: 22, humidity: 3908 },
    { month: '9월', temperature: 2780, humidity: 3908 },
    { month: '10월', temperature: 2780, humidity: 3908 },
    { month: '11월', temperature: 2780, humidity: 3908 },
    { month: '12월', temperature: 2780, humidity: 3908 },
  ];

  return (
    <div>
      <h2>문제 4</h2>
      <p>차트만들기 + 랜덤버튼</p>

      <Chart data={data} />
    </div>
  );
}
