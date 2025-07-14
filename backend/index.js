const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./Users');
const videosRouter = require('./routes/videosRoutes');
const galleryRouter = require('./routes/galleryRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', usersRouter);
app.use('/api', videosRouter);
app.use('/api', galleryRouter);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});