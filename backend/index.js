const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./Users');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', usersRouter);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});