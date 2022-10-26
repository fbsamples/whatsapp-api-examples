/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/
const express = require("express");
const router = express.Router();

const {
  createQRCode,
  updateQRCode,
  fetchQRCodes,
  sendMessage,
  deleteQRCode,
} = require("../controller/qrCode");

router.post("/qrCode", createQRCode);
router.get("/qrCodes", fetchQRCodes);
router.post("/updateQRCode", updateQRCode);
router.delete("/qrCode", deleteQRCode);
router.post("/sendMessage", sendMessage);

module.exports = router;
