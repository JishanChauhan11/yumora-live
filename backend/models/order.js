const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  flavor: { 
    type: String, 
    required: [true, 'Please select a flavor'] 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'] 
  },
  address: { 
    type: String, 
    required: true 
  },
  city: { 
    type: String, 
    required: true 
  },
  zip: { 
    type: String, 
    required: true 
  },
  status: {
    type: String,
    default: 'Pending', // Useful for Admin Panel later
    enum: ['Pending', 'Shipped', 'Delivered']
  },
  orderDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Order', OrderSchema);