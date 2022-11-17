/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const bodyParser = require("body-parser");
const express = require("express");
const axios = require("axios");
const XHubSignature = require('x-hub-signature');
require('dotenv').config();

const app = express();

const accessToken = process.env.ACCESS_TOKEN;
const appSecret = process.env.APP_SECRET;
const apiVersion = process.env.VERSION;
const recipientNumber = process.env.RECIPIENT_PHONE_NUMBER;
const myNumberId = process.env.PHONE_NUMBER_ID;

const xhub = new XHubSignature('SHA256', appSecret);

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"));

// Copy raw body buffer to req["rawBody"] to generate x-hub signature
app.use(bodyParser.json({
  verify: function (req, res, buf) { req.rawBody = buf; }
}));

const listObject = {
  type: "list",
  header: {
    type: "text",
    text: "Select the food item you would like",
  },
  body: {
    text: "You will be presented with a list of options to choose from",
  },
  footer: {
    text: "All of them are freshly packed",
  },
  action: {
    button: "Order",
    sections: [
      {
        title: "Section 1 - Fruit",
        rows: [
          {
            id: "1",
            title: "Apple",
            description: "Dozen",
          },
          {
            id: "2",
            title: "Orange",
            description: "Dozen",
          },
        ],
      },
      {
        title: "Section 2 - Vegetables",
        rows: [
          {
            id: "3",
            title: "Spinach",
            description: "1kg ",
          },
          {
            id: "2",
            title: "Broccoli",
            description: "1kg",
          },
        ],
      },
    ],
  },
};

buttonObject = {
  type: "button",
  header: {
    type: "text",
    text: "Please confirm your option.",
  },
  body: {
    text: "",
  },
  footer: {
    text: "Please select an option.",
  },
  action: {
    buttons: [
      {
        type: "reply",
        reply: {
          id: "1",
          title: "Yes",
        },
      },
      {
        type: "reply",
        reply: {
          id: "2",
          title: "No",
        },
      },
      {
        type: "reply",
        reply: {
          id: "3",
          title: "Ignore",
        },
      },
    ],
  },
};

let messageObject = {
  messaging_product: "whatsapp",
  recipient_type: "individual",
  to: `${recipientNumber}`,
  type: "interactive",
  interactive: {},
};

app.post("/incoming", function (req, res) {
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

  const message = req.body.entry[0].changes[0].value.messages[0];
  const messageType = message.type;

  if (messageType === "text") {
    sendListMessage();
  } else if (messageType === "interactive") {
    const interactiveType = message.interactive.type;
    if (interactiveType === "list_reply") {
      sendReplyButton(message.interactive);
    }
  }

  res.sendStatus(200);
});

function sendListMessage() {
  messageObject.interactive = listObject;

  axios.post(
    `https://graph.facebook.com/${apiVersion}/${myNumberId}/messages`,
    messageObject,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

function sendReplyButton(reply) {
  buttonObject.body.text =
    reply.list_reply.id +
    ". " +
    reply.list_reply.title +
    " (" +
    reply.list_reply.description +
    ")";
  messageObject.interactive = buttonObject;

  axios.post(
    `https://graph.facebook.com/${apiVersion}/${recipientNumberId}/messages`,
    messageObject,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

app.listen();
