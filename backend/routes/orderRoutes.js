const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController'); // ✅ Import updateOrderStatus

router.route('/')
  .post(createOrder)
  .get(getOrders);

router.route('/:id') // ✅ Add this new route
  .put(updateOrderStatus);

module.exports = router;