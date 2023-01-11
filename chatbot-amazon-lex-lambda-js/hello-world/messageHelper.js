/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const axios = require('axios');

async function sendWhatsAppMessage(message) {

  var data = JSON.stringify({
    "messaging_product": "whatsapp",
    "preview_url": false,
    "recipient_type": "individual",
    "to": process.env.RECIPIENT_NUMBER,
    "type": "text",
    "text": {
        "body": message
    }
  });

  var config = {
    method: 'post',
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  return await axios(config)
}

module.exports = {
  sendWhatsAppMessage: sendWhatsAppMessage,
};
