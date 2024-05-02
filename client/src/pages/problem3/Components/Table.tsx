import styled from '@emotion/styled';
import { EmployeesType } from '..';
import { ColumnsType, columns } from '../constant';
import TableTr from './Table.Tr';

export interface TableProps {
  columns: ColumnsType[];
  employees: EmployeesType[];
}

export default function Table(props: TableProps) {
  return (
    <TableStyle>
      <thead>
        <tr>
          {props.columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {props.employees.map((employee, index) => {
          return <TableTr key={index} employee={employee} columns={columns} />;
        })}
      </tbody>
    </TableStyle>
  );
}

const TableStyle = styled.table`
  th {
    padding: 0 10px;
    text-align: right;
  }
`;
