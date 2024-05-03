const express = require('express');
const cors = require('cors');
require('dotenv').config();

//mariaDB
const mysql = require('mysql2');
const { getPingPong } = require('./controller');

const app = express();
const port = 3000;

// CORS 에러 해결
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST, // MariaDB 호스트 주소
  user: process.env.DB_USERNAME, // MariaDB 사용자 이름
  password: process.env.DB_PASSWORD, // MariaDB 암호
  database: process.env.DB_NAME, // 사용할 데이터베이스 이름
});

connection.connect((err) => {
  if (err) {
    console.error('MariaDB 연결 오류:', err);
    throw err;
  }
  console.log('MariaDB Connected.');
});

//timeout memory관리 필요.
// const timeoutArray = [];

// app.use((req, res, next) => {
//   console.log(req, `${req.method} ${req.path}`);
//   next();
// });

//문제2 용
app.get('/', getPingPong);

//문제3 용
app.get('/employees', (req, res) => {
  // 서버시간(UTC-9) 기준 => UTC 1999-12-31T15:00:00.000Z
  connection.query('SELECT * FROM employees WHERE hire_date >= ? ', ['2000-01-01'], (error, results) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log(results);
    //병렬 비동기 실행 emp_no가지고 데이터를 추가시킨다.
    const promises = results.map((result) => {
      return new Promise((resolve, reject) => {
        //todo emp_no를 가지고 titles 테이블에서 title을 가져온다.
        connection.query('SELECT title FROM titles WHERE emp_no = ?', [result.emp_no], (error, titleResults) => {
          if (error) {
            return reject(error);
          }

          // title 추가
          result.title = titleResults[0].title;
        });

        //todo emp_no를 가지고 salaries 테이블에서 max_salary를 가져온다.
        connection.query('SELECT MAX(salary) FROM salaries WHERE emp_no = ?', [result.emp_no], (error, salaryResults) => {
          if (error) {
            return reject(error);
          }

          // max_salary 추가
          result.max_salary = salaryResults[0]['MAX(salary)'];

          // console.log('salaryResults:', result);
          // resolve(result);
        });

        //todo emp_no를 가지고 dept_emp 테이블에서 dept_no를 가져온다. -> dept_no를 가지고 dept_name을 가져온다.
        connection.query('SELECT dept_no FROM dept_emp WHERE emp_no = ?', [result.emp_no], (error, deptResults) => {
          if (error) {
            return reject(error);
          }

          // console.log(deptResults);

          //dept_no 2개인 경우가 있으니 미리 빈배열 할당
          result.dept_no = deptResults;
          result.dept_name = [];

          // dept_no로 정렬 (실행 예 참고)
          deptResults
            .sort((a, b) => b.dept_no.slice(1) - a.dept_no.slice(1))
            .forEach((deptResult) => {
              connection.query('SELECT dept_name FROM departments WHERE dept_no = ?', [deptResult.dept_no], (error, nameResults) => {
                if (error) {
                  return reject(error);
                }
                // dept_name 추가
                result.dept_name.push(nameResults[0].dept_name);
                resolve(result);
              });
            });
        });
      });
    });

    Promise.all(promises)
      .then((resultsWithAddData) => {
        //이름순으로 정렬
        const sortResult = resultsWithAddData.sort((a, b) => {
          return a.first_name.localeCompare(b.first_name);
        });

        //부서가 2개인 경우를 처리
        const divDeptResult = [];
        sortResult.map((employee) => {
          if (employee.dept_name.length > 1) {
            return employee.dept_name.map((dept_name) => {
              const newEmployee = { ...employee, dept_name: [dept_name] };
              return divDeptResult.push(newEmployee);
            });
          }
          return divDeptResult.push(employee);
        });

        res.send(JSON.stringify(divDeptResult));
      })
      .catch((error) => {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
      });
  });
});

//!! employees 테이블 데이터
//  emp_no: 종업원번호
//  last_name: 이름
//  first_name: 성
//  gender: 성별,
//  hire_date: 고용일자

//필요 dept_name 부서이름
//필요 title 직급
//필요 max_salary 최대급여
//  birth_date: 생일 , 불필요

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
