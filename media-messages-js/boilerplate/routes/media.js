/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const express = require("express");
const router = express.Router();

const {
  uploadMedia,
  getMediaUrl,
  sendMediaMessage,
  deleteMedia,
} = require("../controller/media");

router.post("/uploadMedia/:id", uploadMedia);
router.get("/getMedia/:id", getMediaUrl);
router.delete("/deleteMedia/:id", deleteMedia);
router.post("/sendMediaMessage/:id", sendMediaMessage);

module.exports = router;
