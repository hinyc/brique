const express = require('express');
const cors = require('cors');
require('dotenv').config();

//mariaDB
const mysql = require('mysql2');

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

app.get('/', (req, res) => {
  const timeout = setTimeout(() => {
    if (req.query.text === 'Ping') {
      res.send('Pong');
      return;
    }
    res.send(req.query.text);
  }, 3000);

  // timeoutArray.push(timeout);
});

app.get('/employees', (req, res) => {
  console.log('employees');
  connection.query('SELECT * FROM employees', (error, results) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('results:', results[0]);
    res.send(JSON.stringify(results[0]));
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
