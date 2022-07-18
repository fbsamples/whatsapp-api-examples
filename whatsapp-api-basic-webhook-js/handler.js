/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const AWS = require('aws-sdk')
const serverless = require('serverless-http')
const express = require('express')
const app = express()
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const token = process.env.TOKEN

app.get('/webhooks',  (req, res) => {
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == token
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
})

app.post('/webhooks',  (req, res) => {
  const body = JSON.parse(req.body)
  if(body.field !== 'messages'){
    // not from the messages webhook so dont process
    return res.sendStatus(400)
  }
  const review = {
    phonenumber: body.value.metadata.display_phone_number,
    review: body.value.messages.map((message)=>message.text.body).join('\n\n')
  }
  const reviewInfo = {
    TableName: process.env.REVIEW_TABLE,
    Item: review,
  };
  return dynamoDb.put(reviewInfo).promise()
    .then((data) => res.sendStatus(200));
  
})
 
module.exports.handler = serverless(app);