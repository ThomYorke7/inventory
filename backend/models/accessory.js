const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['sleeves', 'dices', 'playmats'],
  },
  image: { type: String },
  price: {
    required: true,
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;
