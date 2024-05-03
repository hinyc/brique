import styled from '@emotion/styled';
import Chart from './components/chart';
import DataTable from './components/dataTable';
import useStore4 from './store';

export default function Problem4() {
  const { setChartDataRandom } = useStore4();
  return (
    <Problem4Style>
      <h2>문제 4, 테이블, 차트 연동</h2>
      <p>
        인풋값을 입력하면 테이블과 차트에 데이터가 입력됩니다. <br />
        랜덤버튼을 클릭하면 범위에내에서 랜덤데이터가 생성됩니다.
        <br />
        <strong> 입력 가능 데이터 범위는 온도 0~40 (℃), 습도 0~100(%)</strong>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  .table__chart {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
  }
`;
