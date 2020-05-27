const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardgameSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    type: String,
    maxlength: 200,
  },
  author: {
    required: true,
    type: String,
  },
  publisher: {
    required: true,
    type: String,
  },
  duration: {
    type: Number,
  },
  min_players: {
    type: Number,
    required: true,
  },
  max_players: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
});

const Boardgame = mongoose.model('Boardgame', boardgameSchema);

module.exports = Boardgame;
