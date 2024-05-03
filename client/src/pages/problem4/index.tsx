import Chart, { ChartDataType } from './components/chart';

export default function Problem4() {
  const data: ChartDataType[] = [
    { month: '1월', temperature: 40, humidity: 24 },
    { month: '2월', temperature: 30, humidity: 13 },
    { month: '3월', temperature: 20, humidity: 98 },
    { month: '4월', temperature: 27, humidity: 39 },
    { month: '5월', temperature: 27, humidity: 39 },
    { month: '6월', temperature: 27, humidity: 39 },
    { month: '7월', temperature: 27, humidity: 39 },
    { month: '8월', temperature: 21, humidity: 39 },
    { month: '9월', temperature: 27, humidity: 39 },
    { month: '10월', temperature: 20, humidity: 38 },
    { month: '11월', temperature: 20, humidity: 38 },
    { month: '12월', temperature: 20, humidity: 38 }
  ];

  return (
    <div>
      <h2>문제 4</h2>
      <p>차트만들기 + 랜덤버튼</p>

      <Chart data={data} />
    </div>
  );
}
