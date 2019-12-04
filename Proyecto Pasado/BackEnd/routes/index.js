var express = require('express');
var router = express.Router();
var Product = require('../db/products')

/* GET home page. */
router.get('/', function(req, res, next) {
    var products = Product.find();
  res.render('shop/index', { title: 'Shopping Cart', products: products });
});

module.exports = router;