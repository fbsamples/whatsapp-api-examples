/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const request = require("request");

exports.getPhoneNumbers = async (req, res) => {
  request.get(
    {
      url: `https://graph.facebook.com/v13.0/${req.params.id}/phone_numbers`,
      headers: {
        Authorization: `Bearer ${process.env.META_AUTH_TOKEN}`,
      },
    },
    function (err, resp, body) {
      if (err) {
        console.log("Error!");
      } else {
        res.json(JSON.parse(body));
      }
    }
  );
};
