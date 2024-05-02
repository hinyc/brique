const getPingPong = (req, res) => {
  const timeout = setTimeout(() => {
    if (req.query.text === 'Ping') {
      res.send('Pong');
      return;
    }
    res.send(req.query.text);
  }, 3000);
};

module.exports = {
  getPingPong,
};
