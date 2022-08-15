/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/
const formidable = require("formidable");
const request = require("request");
const fs = require("fs");

exports.createQRCode = async (req, res) => {
  const { message, type } = req.body;
  if (!message || !type) {
    return res.status(400).json({
      error: "Required Fields: Message, Type",
    });
  }
  request.post(
    {
      url: `https://graph.facebook.com/v14.0/${process.env.META_PHONE_ID}/message_qrdls?prefilled_message=${message}&generate_qr_image=${type}&access_token=${process.env.META_AUTH_TOKEN}`,
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

exports.fetchQRCodes = async (req, res) => {
  request.get(
    {
      url: `https://graph.facebook.com/v14.0/${process.env.META_PHONE_ID}/message_qrdls?access_token=${process.env.META_AUTH_TOKEN}`,
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

exports.updateQRCode = async (req, res) => {
  const { message, id } = req.body;
  if (!message || !id) {
    return res.status(400).json({
      error: "Required Fields: Message and ID",
    });
  }
  request.post(
    {
      url: `https://graph.facebook.com/v14.0/${process.env.META_PHONE_ID}/message_qrdls/${id}?prefilled_message=${message}&access_token=${process.env.META_AUTH_TOKEN}`,
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
  const { to, type } = req.body;
  if (!to || !type) {
    return res.status(400).json({
      error: "Required Fields: to and type",
    });
  }
  request.post(
    {
      url: `https://graph.facebook.com/v13.0/${process.env.META_PHONE_ID}/messages`,
      headers: {
        Authorization: `Bearer ${process.env.META_AUTH_TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(req.body),
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

exports.deleteQRCode = async (req, res) => {
  const { id } = req.query;
  request.delete(
    {
      url: `https://graph.facebook.com/v14.0/${process.env.META_PHONE_ID}/message_qrdls/${id}?access_token=${process.env.META_AUTH_TOKEN}`,
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
