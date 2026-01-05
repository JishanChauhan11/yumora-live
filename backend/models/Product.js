const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Product name is required'] 
  },
  flavor: { 
    type: String, 
    required: [true, 'Flavor is required'] 
  },
  price: {
    type: Number,
    required: true,
    default: 29.99
  },
  description: {
    type: String,
    default: 'High-performance energy fuel.'
  },
  image: {
    type: String,
    default: 'https://placehold.co/400x400/111/crimson?text=New+Drop' // Default placeholder
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);