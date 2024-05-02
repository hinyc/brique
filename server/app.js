const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

//timeout memory관리 필요.
// const timeoutArray = [];

// CORS 에러 해결
app.use(cors());

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
