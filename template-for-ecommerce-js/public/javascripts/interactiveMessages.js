/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const list = {
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "PHONE_NUMBER",
  "type": "interactive",
  "interactive": {
    "type": "list",
    "header": {
      "type": "text",
      "text": "Add to Item to Existing Pending Order"
    },
    "body": {
      "text": "View our list of produce to add to your existing order. Hurry before your order is out for delivery!"
    },
    "footer": {
      "text": "Markt online groceries"
    },
    "action": {
      "button": "Products List",
      "sections": [
        {
          "title": "Fresh Produce",
          "rows": [
            {
              "id": "SECTION_1_ROW_1_ID",
              "title": "SECTION_1_ROW_1_TITLE",
              "description": "SECTION_1_ROW_1_DESCRIPTION"
            },
            {
              "id": "SECTION_1_ROW_2_ID",
              "title": "SECTION_1_ROW_2_TITLE",
              "description": "SECTION_1_ROW_2_DESCRIPTION"
            }
          ]
        },
        {
          "title": "Fresh Produce Cont",
          "rows":[]
        }
      ]
    }
  }
}

const replyButton = {
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "PHONE_NUMBER",
  "type": "interactive",
  "interactive": {
    "type": "button",
    "body": {
      "text": "Do you want to add an item to your order?"
    },
    "action": {
      "buttons": [
        {
          "type": "reply",
          "reply": {
            "id": "0",
            "title": "No"
          }
        },
        {
          "type": "reply",
          "reply": {
            "id": "1",
            "title": "Yes"
          }
        }
      ]
    }
  }
}


if (exports) {
  exports.interactiveList = list;
  exports.interactiveReplyButton = replyButton;
}
