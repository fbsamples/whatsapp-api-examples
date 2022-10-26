/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
require('dotenv').config()
var { movies } = require('../public/javascripts/movies');
const { sendMessage, getTemplatedMessageInput } = require("../messageHelper");

router.use(bodyParser.json());

router.post('/', function(req, res, next) {
  var movie = movies.filter((v,i) => v.id == req.body.id)[0];

  var data = getTemplatedMessageInput(process.env.RECIPIENT_WAID, movie, req.body.seats);
  
  sendMessage(data)
    .then(function (response) {
      res.redirect('/catalog');
      return;
    })
    .catch(function (error) {
      console.log(error);
      return;
    });
});

module.exports = router;



