const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products.route');
const customersRoutes = require('./routes/customers.route');
const ordersRoutes = require('./routes/orders.route');

const path = require('path');
const { API_ROUTES } = require('./constants/api_routes');


const app = express();
const PORT = process.env.PORT || 3000;
const URI = `http://localhost:${PORT}`

// Connect to MongoDB
mongoose.connect('your-connection-mongodb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Frontend

// Main Route 
app.get('/', async (req, res) => {
  res.render('index');
});

// Route products
app.get('/products', async (req, res) => {
  try {
    const response = await axios.get(`${URI}${API_ROUTES.products}`);
    res.render('products/index', { products: response.data });
  } catch (error) {
    res.status(500).send('Error retrieving products');
  }
});

// Route form product
app.get('/products/form', async (req, res) => {
  let product = null;
  if (req.query.productId) {
    try {
      const response = await axios.get(`${URI}${API_ROUTES.products}/${req.query.productId}`);
      product = response.data;
    } catch (error) {
    }
  }
  res.render('products/form', { product: product });
});



// Route clients
app.get('/customers', async (req, res) => {
  try {
    const response = await axios.get(`${URI}${API_ROUTES.customers}`);
    res.render('customers/index', { customers: response.data });
  } catch (error) {
    res.status(500).send('Error retrieving customers');
  }
});

// Route form client
app.get('/customers/form', async (req, res) => {
  let customer = null;
  if (req.query.customerId) {
    try {
      const response = await axios.get(`${URI}${API_ROUTES.customers}/${req.query.customerId}`);
      customer = response.data;
    } catch (error) {
    }
  }
  res.render('customers/form', { customer: customer });
});

// Route orders
app.get('/orders', async (req, res) => {
  try {
    const ordersResponse = await axios.get(`${URI}${API_ROUTES.orders}`);
    res.render('orders/index', { orders: ordersResponse.data });
  } catch (error) {
    res.status(500).send('Error retrieving orders');
  }
});

// Route form order
app.get('/orders/form', async (req, res) => {
  let order = null;
  let customers = [];
  let products = [];
  try {
    const customersResponse = await axios.get(`${URI}${API_ROUTES.customers}`);
    const productsResponse = await axios.get(`${URI}${API_ROUTES.products}`);
    customers = customersResponse.data;
    products = productsResponse.data;

    if (req.query.orderId) {
      const orderResponse = await axios.get(`${URI}${API_ROUTES.products}/${req.query.orderId}`);
      order = orderResponse.data;
    }
  } catch (error) {
  }
  res.render('orders/form', { order: order, customers: customers, products: products });
});

// Route report view
app.get('/reports', (req, res) => {
  res.render('reports/index');
});



// API Routes
app.use(API_ROUTES.products, productsRoutes);
app.use(API_ROUTES.customers, customersRoutes);
app.use(API_ROUTES.orders, ordersRoutes);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


