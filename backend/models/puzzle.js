const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const puzzleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pieces: {
    required: true,
    type: String,
    enum: ['500', '1000', '1500', '2000'],
  },
  price: {
    required: true,
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

const Puzzle = mongoose.model('Puzzle', puzzleSchema);

module.exports = Puzzle;
