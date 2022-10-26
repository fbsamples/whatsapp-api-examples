/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var xhub = require("express-x-hub");

const axios = require("axios");
const temporaryAccessToken = "{{temporary_access_token}}";

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"));

app.use(xhub({ algorithm: "sha1", secret: process.env.APP_SECRET }));
app.use(bodyParser.json());

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

var messageObject = {
  messaging_product: "whatsapp",
  recipient_type: "individual",
  to: "{{recipient_phone_number}}",
  type: "interactive",
  interactive: {},
};

app.post("/facebook", function (req, res) {
  if (!req.isXHubValid()) {
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
    "https://graph.facebook.com/v13.0/{{phone_number_id}}/messages",
    messageObject,
    {
      headers: {
        Authorization: `Bearer ${temporaryAccessToken}`,
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
    "https://graph.facebook.com/v13.0/{{phone_number_id}}/messages",
    messageObject,
    {
      headers: {
        Authorization: `Bearer ${temporaryAccessToken}`,
      },
    }
  );
}

app.listen();
