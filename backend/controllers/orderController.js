const Order = require('../models/Order');

// @desc    Create a new Pre-Order
// @route   POST /api/orders
// @access  Public
exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    
    res.status(201).json({
      success: true,
      data: newOrder
    });
    console.log("✅ New Order Created:", newOrder.name);
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all orders (For Admin)
// @route   GET /api/orders
// @access  Private (We will secure this later)
exports.getOrders = async (req, res) => {
  try {
    // Sort by newest first (-1)
    const orders = await Order.find().sort({ orderDate: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};