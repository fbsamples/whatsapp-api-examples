/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const axios = require('axios');
const { messageTemplates } = require('./public/javascripts/messageTemplates')
const { products } = require('./public/javascripts/products')

const accessToken = process.env.ACCESS_TOKEN;
const apiVersion = process.env.VERSION;
const recipientNumber = process.env.RECIPIENT_PHONE_NUMBER;
const myNumberId = process.env.PHONE_NUMBER_ID;
const myBizAcctId = process.env.BUSINESS_ACCOUNT_ID;

async function sendWhatsAppMessage(data) {
  const config = {
    method: 'post',
    url: `https://graph.facebook.com/${apiVersion}/${myNumberId}/messages`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  return await axios(config)
}

async function updateWhatsAppMessage(data) {
  const config = {
    method: 'put',
    url: `https://graph.facebook.com/${apiVersion}/${myNumberId}/messages`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  return await axios(config)
}

function createProductsList(product) {
  return {
    "id": `${product.id}`,
    "title": product.name,
    "description": `$${product.price}`
  }
}

function getMessageData(recipient, order) {

  const messageTemplate = messageTemplates[order.statusId - 1]

  let messageParameters

  switch (messageTemplate.name) {
    case 'welcome':
      messageParameters = [
        { type: "text", text: order.customer.split(' ')[0] },
      ];
      break;
    case 'payment_analysis':
      messageParameters = [
        { type: "text", text: order.customer.split(' ')[0] },
        { type: "text", text: products[order.items[0].productId - 1].name },
      ];
      break;
    case 'payment_approved':
      messageParameters = [
        { type: "text", text: order.customer.split(' ')[0] },
        { type: "text", text: order.id },
        { type: "text", text: order.deliveryDate },
      ];
      break;
    case 'invoice_available':
      messageParameters = [
        { type: "text", text: order.customer.split(' ')[0] },
        { type: "text", text: products[order.items[0].productId - 1].name },
        { type: "text", text: `https://customer.your-awesome-grocery-store-demo.com/my-account/orders/${order.id}` },
      ];
      break;
    case 'order_picked_packed':
      messageParameters = [
        { type: "text", text: order.customer.split(' ')[0] },
        { type: "text", text: order.id },
        { type: "text", text: `https://customer.your-awesome-grocery-store-demo.com/my-account/orders/${order.id}` },
      ];
      break;
    case 'order_in_transit':
      messageParameters = [
        { type: "text", text: order.customer.split(' ')[0] },
        { type: "text", text: order.id },
        { type: "text", text: order.deliveryDate },
        { type: "text", text: `https://customer.your-awesome-grocery-store-demo.com/my-account/orders/${order.id}` },
      ];
      break;
    case 'order_delivered':
      messageParameters = [
        { type: "text", text: order.customer.split(' ')[0] },
        { type: "text", text: order.id },
        { type: "text", text: order.deadlineDays },
      ];
      break;
  }

  const messageData = {
    messaging_product: "whatsapp",
    to: recipient,
    type: "template",
    template: {
      name: process.env.TEMPLATE_NAME_PREFIX + '_' + messageTemplate.name,
      language: { "code": "en_US" },
      components: [{
          type: "body",
          parameters: messageParameters
        }]}}

  return JSON.stringify(messageData);
}

async function listTemplates() {

  return await axios({
    method: 'get',
    url: `https://graph.facebook.com/${apiVersion}/${myBizAcctId}/message_templates`
      + '?limit=1000'
      + `&access_token=${accessToken}`
  })
}

async function createMessageTemplate(template) {

  console.log('name:'  +  process.env.TEMPLATE_NAME_PREFIX + '_' + template.name);

  const config = {
    method: 'post',
    url: `https://graph.facebook.com/${apiVersion}/${myBizAcctId}/message_templates`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    data: {
      name:  process.env.TEMPLATE_NAME_PREFIX + '_' + template.name,
      category: template.category,
      components: template.components,
      language: template.language
    }
  };

  return await axios(config)
}

module.exports = {
  sendWhatsAppMessage: sendWhatsAppMessage,
  updateWhatsAppMessage: updateWhatsAppMessage,
  listTemplates: listTemplates,
  createMessageTemplate: createMessageTemplate,
  getMessageData: getMessageData,
  createProductsList: createProductsList
};
