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
const { uploadImageAndCreateMessageTemplate  } = require("../messageHelper");
const { listTemplates } = require("../messageHelper");

router.use(bodyParser.json());

router.post('/', function (req, res, next) {

  const templateName = process.env.TEMPLATE_NAME;

  listTemplates(templateName)
    .then(function (response) {
      let templates = response.data.data.filter(t => t.name == templateName && t.status === 'APPROVED')

      if (templates.length > 0) {
        console.log(`Template: ${templates[0].name} already exists. Redirecting to courses.`)
        res.redirect('/courses');
        return;
      }

      console.log(`Creating template: ${templateName}.`)

      uploadImageAndCreateMessageTemplate(templateName)
        .then(function (response) {
          console.log(response)
          res.redirect('/courses');
          return;
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.response.data);
          return;
        });
      return;
    })

});

module.exports = router;
