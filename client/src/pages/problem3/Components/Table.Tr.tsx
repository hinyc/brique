import { format } from 'date-fns';
import { EmployeesType } from '..';
import { ColumnsType } from '../constant';

interface TableTrProps {
  employee: EmployeesType;
  columns: ColumnsType[];
}
export default function TableTr(props: TableTrProps) {
  return (
    <tr key={props.employee.emp_no}>
      {props.columns.map((column) => {
        if (column === 'hire_date') {
          //date-fns format 상용시 자동으로 local 시간대로 변환되어 출력됨.
          return <th key={column}>{format(props.employee[column], 'yyyy-MM-dd')}</th>;
        }

        return <th key={column}>{props.employee[column]}</th>;
      })}
    </tr>
  );
}