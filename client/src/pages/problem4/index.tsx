import styled from '@emotion/styled';
import Chart from './components/chart';
import DataTable from './components/dataTable';
import useStore4 from './store';

export default function Problem4() {
  const { setChartDataRandom } = useStore4();
  return (
    <Problem4Style>
      <h2>문제 4</h2>
      <p>
        차트만들기 + 랜덤버튼
        <br />
        <strong> 입력 가능 데이터 범위는 온도 0~40 (℃), 습도 20~100(%)</strong>
      </p>
      {/* random data 범위는 온도 0~40, 습도 20~100 */}
      <button onClick={setChartDataRandom}>random</button>
      <div className="table__chart">
        <DataTable />
        <Chart />
      </div>
    </Problem4Style>
  );
}

const Problem4Style = styled.div`
  .table__chart {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
  }
`;
