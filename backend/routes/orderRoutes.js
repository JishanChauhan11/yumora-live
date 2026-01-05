const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');

// Route: /api/orders
router.route('/')
  .post(createOrder)  // When sending data
  .get(getOrders);    // When fetching data

module.exports = router;