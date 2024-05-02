const express = require('express');
const cors = require('cors');
require('dotenv').config();

//mariaDB
const mysql = require('mysql2');
const { getPingPong, getEmployees } = require('./controller');

const app = express();
const port = 3000;

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

// CORS 에러 해결

// app.use((req, res, next) => {
//   console.log(req, `${req.method} ${req.path}`);
//   next();
// });

//문제2 용
app.get('/', getPingPong);

//문제3 용
app.get('/employees', (req, res) => {
  connection.query('SELECT * FROM employees WHERE hire_date >= "2000-01-01"', (error, results) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log('results:', results);
    //병령 비동기 실행
    const promises = results.map((result) => {
      return new Promise((resolve, reject) => {
        // emp_no를 사용하여 titles 테이블에서 title가좀
        connection.query('SELECT title FROM titles WHERE emp_no = ?', [result.emp_no], (error, titleResults) => {
          if (error) {
            return reject(error);
          }

          // title 추가
          result.title = titleResults[0].title;
          resolve(result);
        });
      });
    });

    Promise.all(promises)
      .then((resultsWithTitles) => {
        console.log('resultsWithTitles:', resultsWithTitles);
        res.send(JSON.stringify(resultsWithTitles));
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

//todo emp_no를 가지고 titles 테이블에서 title을 가져온다.
//todo emp_no를 가지고 salaries 테이블에서 max_salary를 가져온다.
//todo emp_no를 가지고 dept_emp 테이블에서 dept_no를 가져온다. -> dept_no를 가지고 dept_name을 가져온다.

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
