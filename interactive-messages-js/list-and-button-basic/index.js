/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const axios = require("axios");
temporaryAccessToken = "{{temporary_access_token}}";

listInteractiveObject = {
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

buttonInteractiveObject = {
  type: "button",
  header: {
    type: "text",
    text: "Dear valued customer.",
  },
  body: {
    text: "Would you like to receive marketing messages from us in the future?",
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
          title: "Never",
        },
      },
    ],
  },
};

messageObject = {
  messaging_product: "whatsapp",
  recipient_type: "individual",
  to: "{{recipient_phone_number}}",
  type: "interactive",
  interactive: listInteractiveObject,
};

axios
  .post(
    "https://graph.facebook.com/v13.0/{{phone_number_id}}/messages",
    textMessage,
    {
      headers: {
        Authorization: `Bearer ${temporaryAccessToken}`,
      },
    }
  )
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
