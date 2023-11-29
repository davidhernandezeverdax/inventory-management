const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  stock: String,
  createdAt: Date
});

module.exports = mongoose.model('Product', productSchema);
