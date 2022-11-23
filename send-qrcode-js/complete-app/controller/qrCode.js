/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/
const formidable = require("formidable");
// const axios = require("axios");
const request = require("request");
const fs = require("fs");

const accessToken = process.env.ACCESS_TOKEN;
const apiVersion = process.env.VERSION;
const recipientNumber = process.env.RECIPIENT_PHONE_NUMBER;
const myPhoneNumberId = process.env.PHONE_NUMBER_ID;

exports.createQRCode = async (req, res) => {
  const { message, type } = req.body;
  if (!message || !type) {
    console.log('Error: Request missing required fields "message" and "type"');
    console.log(req.body);

    return res.status(400).json({
      error: "Required Fields: Message, Type",
    });
  }
  request.post(
    {
      url: `https://graph.facebook.com/${apiVersion}/${myPhoneNumberId}/message_qrdls?prefilled_message=${message}&generate_qr_image=${type}&access_token=${process.env.META_AUTH_TOKEN}`,
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
      url: `https://graph.facebook.com/${apiVersion}/${myPhoneNumberId}/message_qrdls?access_token=${process.env.META_AUTH_TOKEN}`,
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
      url: `https://graph.facebook.com/${apiVersion}/${myPhoneNumberId}/message_qrdls/${id}?prefilled_message=${message}&access_token=${process.env.META_AUTH_TOKEN}`,
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
      url: `https://graph.facebook.com/${apiVersion}/${myPhoneNumberId}/messages`,
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
      url: `https://graph.facebook.com/${apiVersion}/${myPhoneNumberId}/message_qrdls/${id}?access_token=${process.env.META_AUTH_TOKEN}`,
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
