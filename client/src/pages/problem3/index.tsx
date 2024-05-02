import React from 'react';
import { requestEmployees } from './request';

export default function Problem3() {
  //mysq12 설치
  //db 접속
  return (
    <div>
      <h2>문제3</h2>
      <button onClick={requestEmployees}>click</button>
    </div>
  );
}
