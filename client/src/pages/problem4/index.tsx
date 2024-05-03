import styled from '@emotion/styled';
import Chart from './components/chart';
import DataTable from './components/dataTable';

export default function Problem4() {
  return (
    <Problem4Style>
      <h2>문제 4</h2>
      <p>차트만들기 + 랜덤버튼</p>
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
    gap: 40px;
  }
`;
