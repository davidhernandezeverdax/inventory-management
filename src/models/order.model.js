const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  products: [{ productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, quantity: Number }],
  createdAt: {type: Date, default: new Date()},
  total: Number
});

module.exports = mongoose.model('Order', orderSchema);
