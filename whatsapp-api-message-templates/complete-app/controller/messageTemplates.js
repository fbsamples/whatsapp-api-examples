/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const formidable = require("formidable");
const request = require("request");
const fs = require("fs");

exports.createMessageTemplate = async (req, res) => {
  const { name, language, category, components } = req.body;
  if (!name || !language || !category || !components) {
    return res.status(400).json({
      error: "Required Fields: name, language, category and components",
    });
  }
  request.post(
    {
      url: `https://graph.facebook.com/v13.0/${process.env.META_BUSINESS_ID}/message_templates`,
      headers: {
        Authorization: `Bearer ${process.env.META_AUTH_TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        language: language,
        category: category,
        components: components,
      }),
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

exports.getMessageTemplates = async (req, res) => {
  request.get(
    {
      url: `https://graph.facebook.com/v13.0/${process.env.META_BUSINESS_ID}/message_templates`,
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

exports.sendMessage = async (req, res) => {
  const { id, to, type,template } = req.body;
  if (!id || !to || !type || !template) {
    return res.status(400).json({
      error: "Required Fields: to, type, template and id",
    });
  }
  request.post(
    {
      url: `https://graph.facebook.com/v13.0/${req.params.id}/messages`,
      headers: {
        Authorization: `Bearer ${process.env.META_AUTH_TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: process.env.MESSAGING_PRODUCT,
        to: to,
        type: type,
        template: template,
      }),
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

exports.deleteMessageTemplate = async (req, res) => {
  request.delete(
    {
      url: `https://graph.facebook.com/v13.0/${process.env.META_BUSINESS_ID}/message_templates`,
      headers: {
        Authorization: `Bearer ${process.env.META_AUTH_TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: req.body.name,
      }),
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
