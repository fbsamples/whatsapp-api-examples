var express = require('express');
const { products } = require("../public/javascripts/products");
var router = express.Router();

const viewModel = products;

/* GET home page. */
router.post('/', function (req, res, next) {
  console.log(`productId: ${req.body.productId}`);
  console.log(JSON.stringify(req.body));
  res.render('catalog', { title: 'e-Commerce Demo for Node.js', products: viewModel, total: 0.00 });
});

router.get('/', function (req, res, next) {
  res.render('catalog', { title: 'e-Commerce Demo for Node.js', products: viewModel, total: 0.00 });
});

module.exports = router;
