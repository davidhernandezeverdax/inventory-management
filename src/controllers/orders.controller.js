const Order = require('../models/order.model');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer products');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer products');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order', error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};

exports.generateSalesReport = async (req, res) => {
  try {
    const orders = await Order.find({
      createdAt: { $gte: new Date(req.body.startDate), $lte: new Date(req.body.endDate) }
    });
  
    const totalSales = orders.length;
    res.json({ totalSales, startDate: req.body.startDate, endDate: req.body.endDate });
  } catch (error) {
    res.status(500).json({ message: 'Error building report', error: error.message });
  }

};
