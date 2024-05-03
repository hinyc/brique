import { create } from 'zustand';

export type ChartDataType = {
  //월, 평균기온, 평균습도
  month: string;
  temperature: number;
  humidity: number;
};

interface IStore {
  temperatureRage: number[];
  humidityRage: number[];
  chartData: ChartDataType[];
  setChartData: (index: number, key: 'temp' | 'humi', value: number) => void;
  setChartDataRandom: () => void;
}

const useStore4 = create<IStore>((set, get) => ({
  temperatureRage: [0, 40],
  humidityRage: [0, 100],
  chartData: [
    { month: '1월', temperature: 0, humidity: 0 },
    { month: '2월', temperature: 0, humidity: 0 },
    { month: '3월', temperature: 0, humidity: 0 },
    { month: '4월', temperature: 0, humidity: 0 },
    { month: '5월', temperature: 0, humidity: 0 },
    { month: '6월', temperature: 0, humidity: 0 },
    { month: '7월', temperature: 0, humidity: 0 },
    { month: '8월', temperature: 0, humidity: 0 },
    { month: '9월', temperature: 0, humidity: 0 },
    { month: '10월', temperature: 0, humidity: 0 },
    { month: '11월', temperature: 0, humidity: 0 },
    { month: '12월', temperature: 0, humidity: 0 }
  ],

  setChartData: (index, key, value) => {
    const { temperatureRage, humidityRage } = get();
    set((state) => {
      const newData = [...state.chartData];

      if (key === 'temp') {
        if (value < 0) {
          value = 0;
        }
        if (value > temperatureRage[1]) {
          value = temperatureRage[1];
        }
      }

      if (key === 'humi') {
        if (value < 0) {
          value = 0;
        }
        if (value > humidityRage[1]) {
          value = humidityRage[1];
        }
      }

      newData[index][key === 'temp' ? 'temperature' : 'humidity'] = value;
      return { chartData: newData };
    });
  },

  setChartDataRandom: () =>
    set((state) => {
      //random data 범위는 온도 0~40, 습도 20~100
      const { temperatureRage, humidityRage } = get();
      const newData = state.chartData.map((data) => ({
        ...data,
        temperature:
          Math.floor(Math.random() * temperatureRage[1]) + temperatureRage[0],
        // humidity: Math.floor(Math.random() * 80) + 20
        humidity:
          Math.floor(Math.random() * (humidityRage[1] - humidityRage[0])) +
          humidityRage[0]
      }));
      return { chartData: newData };
    })
}));

export default useStore4;
