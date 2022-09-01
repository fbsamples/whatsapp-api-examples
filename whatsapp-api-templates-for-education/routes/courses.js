/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/
var express = require('express');
const { lessonPlans } = require("../public/javascripts/lessonPlans");
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
  res.render('courses', { title: 'Educational Demo for Node.js', lessonPlans: lessonPlans });
});

router.get('/', function (req, res, next) {
  res.render('courses', { title: 'Educational Demo for Node.js', lessonPlans: lessonPlans });
});

module.exports = router;
