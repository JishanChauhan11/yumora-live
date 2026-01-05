const express = require('express');
const router = express.Router();
const { getProducts, addProduct, deleteProduct } = require('../controllers/productController');

router.route('/')
  .get(getProducts)
  .post(addProduct);

router.route('/:id')
  .delete(deleteProduct);

module.exports = router;