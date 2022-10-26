/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

var express = require('express');
const { movies } = require("../public/javascripts/movies");
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  res.render('catalog', { title: 'Movie Ticket Demo for Node.js', movies: movies });
});

router.get('/', function(req, res, next) {
  res.render('catalog', { title: 'Movie Ticket Demo for Node.js', movies: movies });
});

module.exports = router;
