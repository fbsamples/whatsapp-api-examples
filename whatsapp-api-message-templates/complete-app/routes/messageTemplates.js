/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const express = require("express");
const router = express.Router();

const {
  createMessageTemplate,
  getMessageTemplates,
  sendMessage,
  deleteMessageTemplate,
} = require("../controller/messageTemplates");

router.post("/messageTemplate", createMessageTemplate);
router.get("/messageTemplates", getMessageTemplates);
router.delete("/messageTemplate", deleteMessageTemplate);
router.post("/sendMessage/:id", sendMessage);

module.exports = router;
