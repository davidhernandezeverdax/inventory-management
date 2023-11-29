# Inventory Management Application

## Overview

This application is designed to help businesses efficiently manage their inventory. It includes features for tracking products, orders, customers, and provides in-depth reporting and statistics on inventory performance.

## Features

- CRUD operations for products, orders, customers, etc.
- Advanced reporting and analytics for inventory performance.
- Scalable MongoDB database design.
- Well-structured and documented RESTful API using Swagger.
- Simple EJS frontend to interact with the API.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS for frontend

## Getting Started

### Prerequisites

- Node.js
- MongoDB instance (local or remote)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/davidhernandezeverdax/inventory-management.git

2. Navigate to the project directory:
   ```bash
   cd api-books

3. Install dependencies:
   ```bash
   npm install

4. Set up your MongoDB connection string in app.js:
   ```bash
   mongoose.connect('your-connection-mongodb')

5. Start the server:
    node src/app.js
   
### API Endpoints
GET /api/products: Retrieves the list of products.
GET /api/products/{id}: Retrieve a individual product by id.
POST /api/products: Create a new product
PUT /api/products/{id}: Update product by id.


GET /api/customers: Retrieves the list of customers.
GET /api/customers/{id}: Retrieve a individual customer by id.
POST /api/customers: Create a new customer
PUT /api/customers/{id}: Update customer by id.


GET /api/orders: Retrieves the list of orders
GET /api/orders/{id}: Retrieve a individual order by id.
POST /api/orders: Create a new order
PUT /api/orders/{id}: Update order by id.



### Frontend
Access the frontend by navigating to http://localhost:3000 on your browser. Use the search form to test different filters and view the results.
