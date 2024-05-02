import { useState } from 'react';
import { requestEmployees } from './request';
import { columns } from './constant';
import styled from '@emotion/styled';
import Table from './Components/Table';

export type EmployeesType = {
  birth_date: string;
  dept_name: string[];
  dept_no: string[];
  emp_no: number;
  first_name: string;
  gender: 'M' | 'F';
  hire_date: string;
  last_name: string;
  max_salary: number;
  title: string;
};

export default function Problem3() {
  const [employees, setEmployees] = useState<EmployeesType[]>([]);

  //mysq12 설치
  //db 접속

  const _onClickRequestEmployees = async () => {
    requestEmployees().then((data) => {
      if (data) {
        setEmployees(data);
      }
    });
  };

  return (
    <Problem3Style>
      <h2>문제3</h2>
      <button onClick={_onClickRequestEmployees}>click</button>
      <Table columns={columns} employees={employees} />
    </Problem3Style>
  );
}

const Problem3Style = styled.div``;
