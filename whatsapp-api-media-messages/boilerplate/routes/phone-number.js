/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const express = require("express");
const router = express.Router();

const { getPhoneNumbers } = require("../controller/phone-number");

router.get("/phoneNumbers/:id", getPhoneNumbers);

module.exports = router;
