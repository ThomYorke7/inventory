require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use('/uploads', express.static('uploads'));
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

app.use('/boardgames', boardgamesRouter);
app.use('/puzzles', puzzlesRouter);
app.use('/accessories', accessoriesRouter);

app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});
