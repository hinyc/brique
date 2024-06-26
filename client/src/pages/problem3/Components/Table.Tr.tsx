import { format } from 'date-fns';
import { EmployeesType } from '..';
import { ColumnsType } from '../constant';
import styled from '@emotion/styled';

interface TableTrProps {
  employee: EmployeesType;
  columns: ColumnsType[];
}
export default function TableTr(props: TableTrProps) {
  return (
    <TrStyle key={props.employee.emp_no}>
      {props.columns.map((column) => {
        if (column === 'hire_date') {
          //date-fns format 상용시 자동으로 local 시간대로 변환되어 출력됨.
          return (
            <th key={column}>{format(props.employee[column], 'yyyy-MM-dd')}</th>
          );
        }

        return <th key={column}>{props.employee[column]}</th>;
      })}
    </TrStyle>
  );
}

const TrStyle = styled.tr`
  th {
    border: 1px solid lightgray;
    :first-of-type {
      width: 52px;
    }
    :nth-of-type(2) {
      width: 72px;
    }
    :nth-of-type(3) {
      width: 70px;
    }
    :nth-of-type(4) {
      width: 43px;
    }
    :nth-of-type(5) {
      width: 75px;
    }
    :nth-of-type(6) {
      width: 125px;
    }
    :nth-of-type(7) {
      width: 96px;
    }
    :last-of-type {
      width: 70px;
    }
  }
`;
