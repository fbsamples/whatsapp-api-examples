/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const express = require('express');
const router = express.Router();
const { messageStatuses } = require("../public/javascripts/messageStatuses");
const { interactiveList, interactiveReplyButton } = require("../public/javascripts/interactiveMessages");
const { products } = require("../public/javascripts/products");
const { createProductsList, updateWhatsAppMessage, sendWhatsAppMessage } = require("../messageHelper")
const XHubSignature = require('x-hub-signature');

const verificationToken = process.env.WEBHOOK_VERIFICATION_TOKEN;
const appSecret = process.env.APP_SECRET;
const xhub = new XHubSignature('SHA256', appSecret);


async function processMessage(message) {
  const customerPhoneNumber = message.from;
  const messageType = message.type;

  if (messageType === "text") {
    const textMessage = message.text.body;
    console.log( textMessage );

  try {
    let replyButtonMessage = interactiveReplyButton;
    replyButtonMessage.to = process.env.RECIPIENT_PHONE_NUMBER;
    const replyButtonSent = await sendWhatsAppMessage(replyButtonMessage);
    console.log(replyButtonSent);
  } catch (error) {
    console.log(error);
  }

  } else if (messageType === "interactive") {
    const interactiveType = message.interactive.type;

    if (interactiveType === "button_reply") {
      const buttonId = message.interactive.button_reply.id;
      const buttonTitle = message.interactive.button_reply.title;

      if (buttonId == 1) {
        try {
          let productsList = interactiveList;
          productsList.to = process.env.RECIPIENT_PHONE_NUMBER;
          productsList.interactive.action.sections[0].rows = products.map(createProductsList);

          // List messages have a 10 item limit total
          productsList.interactive.action.sections[0].rows.length = 10;
          const sendProductLists = await sendWhatsAppMessage(productsList);
          console.log(sendProductLists);
        } catch (error) {
          console.log(error);
        }
      }
    }
    else if (interactiveType === "list_reply") {
      const itemId = message.interactive.list_reply.id;
      const itemTitle = message.interactive.list_reply.title;
      const itemDescrption = message.interactive.list_reply.description;
    }
  }
}

router.post('/', async function (req, res, next) {
  // Calculate x-hub signature value to check with value in request header
  const calcXHubSignature = xhub.sign(req.rawBody).toLowerCase();

  if(req.headers['x-hub-signature-256'] != calcXHubSignature)
  {
    console.log(
      "Warning - request header X-Hub-Signature not present or invalid"
    );
    res.sendStatus(401);
    return;
  }

  console.log("request header X-Hub-Signature validated");

  const body = req.body.entry[0].changes[0];

  // Verify this is from the messages webhook, not other updates
  if(body.field !== 'messages'){
    // not from the messages webhook so dont process
    return res.sendStatus(400)
  }

  if(body.value.hasOwnProperty("messages")) {

    // Mark an incoming message as read
    try {
      let sendReadStatus = messageStatuses.read;
      sendReadStatus.message_id = body.value.messages[0].id;
      const readSent = await sendWhatsAppMessage(sendReadStatus);
      console.log(readSent);
    } catch (error) {
      console.log(error);
    }

    body.value.messages.forEach(processMessage);
  }

  res.sendStatus( 200 );

});

router.get('/', function (req, res, next) {
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == verificationToken
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
