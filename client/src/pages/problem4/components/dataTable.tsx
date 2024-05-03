import styled from '@emotion/styled';
import useStore4 from '../store';

export default function DataTable() {
  const { chartData, setChartData } = useStore4();

  return (
    <DataTableStyle>
      <thead>
        <tr>
          <th className="empty"></th>
          <th>평균 기온</th>
          <th>평균 습도</th>
        </tr>
      </thead>
      <tbody>
        {chartData.map((data, index) => {
          return (
            <tr key={data.month}>
              <td>{data.month}</td>
              <td>
                <input
                  id="num"
                  type="number"
                  value={data.temperature}
                  min={0}
                  onChange={(e) => {
                    if (e.target.value.length > 1) {
                      if (e.target.value[0] === '0') {
                        e.target.value = e.target.value.slice(1);
                      }
                    }
                    setChartData(index, 'temp', Number(e.target.value));
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={data.humidity}
                  min={0}
                  onChange={(e) => {
                    if (e.target.value.length > 1) {
                      if (e.target.value[0] === '0') {
                        e.target.value = e.target.value.slice(1);
                      }
                    }
                    setChartData(index, 'humi', Number(e.target.value));
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </DataTableStyle>
  );
}

const DataTableStyle = styled.table`
  thead {
    th {
      background-color: gray;
      color: #fff;
      &.empty {
        background-color: #fff;
      }
    }
  }
  tbody {
    td {
      font-weight: 700;
      text-align: right;
    }
  }

  input {
    text-align: right;
    width: 60px;
    font-size: 14px;
    padding: 4px;

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;
