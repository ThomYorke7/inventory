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
  year: { type: Number, required: true },
  image: { type: String },
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
  minPlayers: {
    type: Number,
    required: true,
  },
  maxPlayers: {
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
