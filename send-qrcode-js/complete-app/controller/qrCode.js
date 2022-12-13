/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/
const formidable = require("formidable");
const axios = require("axios");
const fs = require("fs");

const accessToken = process.env.ACCESS_TOKEN;
const apiVersion = process.env.VERSION;
const recipientNumber = process.env.RECIPIENT_PHONE_NUMBER;
const myPhoneNumberId = process.env.PHONE_NUMBER_ID;
const commonHeader =
{
  Authorization: `Bearer ${accessToken}`,
  'Content-Type': 'application/json'
};

exports.createQRCode = async (req, res) => {
  const { message, type } = req.body;
  if (!message || !type) {
    console.log('Error: Request missing required fields "message" and "type"');
    console.log(req.body);

    return res.status(400).json({
      error: "Required fields: Message, Type",
    });
  }

  const qrdlObject =
  {
    "prefilled_message" : message,
    "generate_qr_image" : type
  }

  const config =
  {
    "method" : "post",
    "url" : `https://graph.facebook.com/${apiVersion}/${myPhoneNumberId}/message_qrdls`,
    "headers" : commonHeader,
    "data" : qrdlObject
  };

  try
  {
    let qr_post_res = await axios( config );
    res.json( qr_post_res.data );
  }
  catch( err )
  {
    console.log( "Error creating QR!" );
    console.log( err );
  }
};

exports.fetchQRCodes = async (req, res) => {
  const config =
  {
    "method" : "get",
    "url" : `https://graph.facebook.com/${apiVersion}/${myPhoneNumberId}/message_qrdls`,
    "headers" : commonHeader
  };

  try
  {
    let qr_post_res = await axios( config );
    res.json( qr_post_res.data );
  }
  catch( err )
  {
    console.log( "Error fetching QR!" );
    console.log( err );
  }
};

exports.updateQRCode = async (req, res) => {
  const { message, id } = req.body;
  if (!message || !id) {
    return res.status(400).json({
      error: "Required fields: Message and Id",
    });
  }

  const qrdlUpdateObject =
  {
    "prefilled_message" : message,
  }

  const config =
  {
    "method" : "post",
    "url" : `https://graph.facebook.com/${apiVersion}/${myPhoneNumberId}/message_qrdls/${id}`,
    "headers" : commonHeader,
    "data" : qrdlUpdateObject
  };

  try
  {
    let qr_post_res = await axios( config );
    res.json( qr_post_res.data );
  }
  catch( err )
  {
    console.log( "Error updating QR message!" );
    console.log( err );
  }
};

exports.sendMessage = async (req, res) => {
  const { to, type } = req.body;
  if (!to || !type) {
    return res.status(400).json({
      error: "Required fields: to and type",
    });
  }

  const config =
  {
    "method" : "post",
    "url" : `https://graph.facebook.com/${apiVersion}/${myPhoneNumberId}/messages`,
    "headers" : commonHeader,
    "data" : JSON.stringify(req.body)
  };

  try
  {
    let send_message_res = await axios( config );
    res.json( send_message_res.data );
  }
  catch( err )
  {
    console.log( "Error sending message!" );
    console.log( err );
  }
};

exports.deleteQRCode = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({
      error: "Required fields: id",
    });
  }

  const config =
  {
    "method" : "delete",
    "url" : `https://graph.facebook.com/${apiVersion}/${myPhoneNumberId}/message_qrdls/${id}`,
    "headers" : commonHeader
  };

  try
  {
    let delete_qr_res = await axios( config );
    res.json( delete_qr_res.data );
  }
  catch( err )
  {
    console.log( "Error deleting QR code!" );
    console.log( err );
  }
};
