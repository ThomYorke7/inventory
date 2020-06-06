require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(helmet());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.on('error', (error) => {
  console.error(error);
});
connection.once('open', () => {
  console.log('Connected to Database');
});

const boardgamesRouter = require('./routes/boardgames');
const puzzlesRouter = require('./routes/puzzles');
const accessoriesRouter = require('./routes/accessories');

app.use('/api/boardgames', boardgamesRouter);
app.use('/api/puzzles', puzzlesRouter);
app.use('/api/accessories', accessoriesRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

if (process.env.NODE_ENV === 'production') {
  app.get(/^((?!(api)).)*$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});
