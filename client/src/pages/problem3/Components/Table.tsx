import styled from "@emotion/styled";
import { EmployeesType } from "..";
import { ColumnsType, columns } from "../constant";
import TableTr from "./Table.Tr";

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
        {props.employees.length === 0 && (
          <tr className="empty">
            <th colSpan={columns.length}>No data</th>
          </tr>
        )}
        {props.employees?.map((employee, index) => {
          return <TableTr key={index} employee={employee} columns={columns} />;
        })}
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
    }
  }

  tbody {
    .empty {
      th {
        padding: 60px;
        text-align: center;
        border: 1px solid lightgray;
      }
    }
    th {
      padding: 0 12px;
      text-align: right;
    }
  }
`;
