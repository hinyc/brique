const axios = require('axios');

const getPingPong = (req, res) => {
  const timeout = setTimeout(() => {
    if (req.query.text === 'Ping') {
      res.send('Pong');
      return;
    }
    res.send(req.query.text);
  }, 3000);
};

const getRandomResponse = (req, res) => {
  //client에서 요청을 보내면 서버에서 다시 요청을 보내는 방식으로 구현
  //client에서 바로 요청시 CORS 에러 발생 (cors는 브라우저 정책)
  axios
    .get('http://codingtest.brique.kr:8080/random')
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    });
};

module.exports = {
  getPingPong,
  getRandomResponse,
};
