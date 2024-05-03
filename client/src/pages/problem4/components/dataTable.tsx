import styled from '@emotion/styled';
import React from 'react';
import useStore4 from '../store';

export default function DataTable() {
  const { chartData, setChartData } = useStore4();

  return (
    <DataTableStyle>
      <thead>
        <tr>
          <th></th>
          <th>평균 기온</th>
          <th>평균 습도</th>
        </tr>
      </thead>
      <tbody>
        {chartData.map((data, index) => (
          <tr key={data.month}>
            <td>{data.month}</td>
            <td>
              <input
                type="number"
                value={data.temperature}
                onChange={(e) =>
                  setChartData(index, 'temp', Number(e.target.value))
                }
              />
            </td>
            <td>
              <input
                type="number"
                value={data.humidity}
                onChange={(e) =>
                  setChartData(index, 'humi', Number(e.target.value))
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </DataTableStyle>
  );
}

const DataTableStyle = styled.table``;
