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
  const [isNetworkError, setIsNetworkError] = useState(false);

  //mysql2 설치
  //db 접속

  const _onClickRequestEmployees = async () => {
    requestEmployees().then((data) => {
      if (data.status === 500) {
        return setIsNetworkError(true);
      }
      if (data) {
        setEmployees(data);
      }
    });
  };

  return (
    <Problem3Style>
      <h2>문제3</h2>
      <p>
        2000년 이후 고용된 직원의 정보를 출력(Mariadb 사용)
        <br />
        <strong>'root/server'위치에서 node app.js 실행 후 확인 가능합니다.</strong>
        <br />
        {isNetworkError && <span className="error">네트워크 에러(500)가 발생했습니다.</span>}
      </p>
      <button onClick={_onClickRequestEmployees}>정보 요청</button>
      <Table columns={columns} employees={employees} />
      <div className="total">{employees.length} row in set</div>
    </Problem3Style>
  );
}

const Problem3Style = styled.div`
  button {
    margin-bottom: 10px;
  }
  .total {
    font-size: 16px;
    font-weight: 500;
    text-align: left;
  }
`;
