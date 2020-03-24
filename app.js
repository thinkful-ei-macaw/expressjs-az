const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Hello!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});