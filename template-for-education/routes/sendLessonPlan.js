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
var { lessonPlans } = require('../public/javascripts/lessonPlans');
const { sendMessage, getLessonPlanTemplatedMessageInput } = require("../messageHelper");

router.use(bodyParser.json());

router.post('/', function (req, res, next) {
  var lessonPlan = lessonPlans.filter((v, i) => v.id == req.body.id)[0];

  const templateName = process.env.TEMPLATE_NAME;

  var data = getLessonPlanTemplatedMessageInput(process.env.RECIPIENT_PHONE_NUMBER, templateName
    , lessonPlan);

  sendMessage(data)
    .then(function (response) {
      console.log(response);
      return;
    })
    .catch(function (error) {
      console.log(error);
      console.log(error.response.data);
    });
});

module.exports = router;
