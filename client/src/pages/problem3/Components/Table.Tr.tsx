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
          return <th key={column}>{props.employee[column].slice(0, 10)}</th>;
        }

        return <th key={column}>{props.employee[column]}</th>;
      })}
    </tr>
  );
}
