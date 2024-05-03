import { create } from 'zustand';

export type ChartDataType = {
  //월, 평균기온, 평균습도
  month: string;
  temperature: number;
  humidity: number;
};

interface IStore {
  chartData: ChartDataType[];
  setChartData: (index: number, key: 'temp' | 'humi', value: number) => void;
}

const useStore4 = create<IStore>((set) => ({
  chartData: [
    { month: '1월', temperature: 10, humidity: 0 },
    { month: '2월', temperature: 0, humidity: 0 },
    { month: '3월', temperature: 0, humidity: 0 },
    { month: '4월', temperature: 2, humidity: 0 },
    { month: '5월', temperature: 0, humidity: 0 },
    { month: '6월', temperature: 0, humidity: 0 },
    { month: '7월', temperature: 0, humidity: 0 },
    { month: '8월', temperature: 0, humidity: 0 },
    { month: '9월', temperature: 0, humidity: 0 },
    { month: '10월', temperature: 0, humidity: 0 },
    { month: '11월', temperature: 0, humidity: 0 },
    { month: '12월', temperature: 0, humidity: 0 }
  ],

  setChartData: (index, key, value) =>
    set((state) => {
      const newData = [...state.chartData];
      newData[index][key === 'temp' ? 'temperature' : 'humidity'] = value;
      return { chartData: newData };
    })
}));

export default useStore4;
