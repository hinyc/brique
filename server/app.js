const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// CORS 에러 해결
app.use(cors());

app.use((req, res, next) => {
  console.log(req, `${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  if (req.query.text === 'Ping') {
    res.send('Pong');
    return;
  }

  res.send(req.query.text);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
