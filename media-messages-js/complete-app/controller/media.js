/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const formidable = require("formidable");
const request = require("request");
const fs = require("fs");
const { validateMediaSize, mediaLimits } = require("../helper/validations");

exports.uploadMedia = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Media could not be uploaded",
      });
    }
    if (!files.file) {
      return res.status(400).json({
        error: "Media File is required",
      });
    }
    if (files.file) {
      let isFileValidSize = validateMediaSize(files.file.size, files.file.type);
      if (!isFileValidSize) {
        return res.status(400).json({
          error: `Media File size should be less than ${mediaLimits(
            files.file.type
          )}`,
        });
      }
    }

    request.post(
      {
        url: `https://graph.facebook.com/v13.0/${req.params.id}/media`,
        formData: {
          file: {
            value: fs.createReadStream(files.file.path),
            options: {
              filename: files.file.name,
              contentType: files.file.type,
            },
          },
          type: files.file.type,
          messaging_product: process.env.MESSAGING_PRODUCT,
        },
        headers: {
          Authorization: `Bearer ${process.env.META_AUTH_TOKEN}`,
          "content-type": "multipart/form-data",
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
  });
};

exports.getMediaUrl = async (req, res) => {
  request.get(
    {
      url: `https://graph.facebook.com/v13.0/${req.params.id}`,
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

exports.sendMediaMessage = async (req, res) => {
  const { id, to, type } = req.body;
  if (!id || !to || !type) {
    return res.status(400).json({
      error: "Required Fields: to, type and id",
    });
  }
  request.post(
    {
      url: `https://graph.facebook.com/v13.0/${req.params.id}/messages`,
      headers: {
        Authorization: `Bearer ${process.env.META_AUTH_TOKEN}`,
        "content-type": "application/json",
      },
      body: `{
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "${to}",
        "type": "${type}",
        "${type}": {
          "id": "${id}",
        },
      }`,
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

exports.deleteMedia = async (req, res) => {
  request.delete(
    {
      url: `https://graph.facebook.com/v13.0/${req.params.id}`,
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
