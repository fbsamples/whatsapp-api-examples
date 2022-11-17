/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
require('dotenv').config()
const { messageTemplates } = require("../public/javascripts/messageTemplates")
const { createMessageTemplate } = require("../messageHelper");
const { listTemplates } = require("../messageHelper");

router.use(bodyParser.json());

router.post('/', async function (req, res, next) {

  try {
      const templatesResponse = await listTemplates()
      const remoteApprovedTemplates =
        templatesResponse.data.data.filter(t => t.status === 'APPROVED');

      const localTemplates = messageTemplates

      for (let index = 0; index < localTemplates.length; index++) {
        const localTemplate = localTemplates[index];

        const queryResult = remoteApprovedTemplates
        .filter(t => t.name == process.env.TEMPLATE_NAME_PREFIX
          + '_' + localTemplate.name)

        console.log(`Creating template: ${localTemplate.name}.`)

        if (queryResult.length > 0) {
          console.log(`Template ${queryResult[0].name} already exists.`)
          continue;
        }

        try {
          await createMessageTemplate(localTemplate);
          console.log(`Template ${localTemplate.name} created successfully.`)
        } catch (error) {
          console.log(`Failed creating template ${localTemplate.name}.`)
          console.log(error.response.data);
        }

      }
    } catch (error) {
      console.log("Failed obtaining remote template list.")
      console.log(error);
    }

    console.log("Redirecting to the backoffice.")
    res.redirect('/backoffice');
});

module.exports = router;
