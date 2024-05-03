import styled from '@emotion/styled';
import { EmployeesType } from '..';
import { ColumnsType, columns } from '../constant';
import TableTr from './Table.Tr';

export interface TableProps {
  columns: ColumnsType[];
  employees: EmployeesType[];
  isLoading: boolean;
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
        {props.employees.length === 0 && !props.isLoading && (
          <tr className="empty">
            <th colSpan={columns.length}>No data</th>
          </tr>
        )}
        {props.isLoading ? (
          <tr className="empty">
            <th colSpan={columns.length}>loading...</th>
          </tr>
        ) : (
          props.employees?.map((employee, index) => {
            return (
              <TableTr key={index} employee={employee} columns={columns} />
            );
          })
        )}
      </tbody>
    </TableStyle>
  );
}

const TableStyle = styled.table`
  thead {
    th {
      background-color: grey;
      color: #fff;
      font-weight: 700;
      padding: 4px 12px;
      text-align: right;
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
  }

  tbody {
    .empty {
      th {
        padding: 184px 60px;
        text-align: center;
        border: 1px solid lightgray;
      }
    }
    th {
      padding: 2px 12px;
      text-align: right;
    }
  }
`;
