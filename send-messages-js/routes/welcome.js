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
const { sendMessage, getTextMessageInput } = require("../messageHelper");

router.use(bodyParser.json());

router.post('/', function(req, res, next) {
  var data = getTextMessageInput(process.env.RECIPIENT_WAID, 'Welcome to the Movie Ticket Demo App for Node.js!');
  
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
