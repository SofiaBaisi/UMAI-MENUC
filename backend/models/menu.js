const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: {type: String, required: true },
  category: {type: String, required: true},
});

module.exports = mongoose.model('menu', menuSchema);