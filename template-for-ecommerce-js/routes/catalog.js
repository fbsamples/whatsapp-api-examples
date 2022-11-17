/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const express = require('express');
const { products } = require("../public/javascripts/products");
const router = express.Router();

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
