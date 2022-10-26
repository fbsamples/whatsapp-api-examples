const axios = require('axios');
const { messageTemplates } = require('./public/javascripts/messageTemplates')
const { products } = require('./public/javascripts/products')

async function sendWhatsAppMessage(data) {
  const config = {
    method: 'post',
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  return await axios(config)
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
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.BUSINESS_ACCOUNT_ID}/message_templates`
      + '?limit=1000'
      + `&access_token=${process.env.ACCESS_TOKEN}`
  })
}

async function createMessageTemplate(template) {

  console.log('name:'  +  process.env.TEMPLATE_NAME_PREFIX + '_' + template.name);

  const config = {
    method: 'post',
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.BUSINESS_ACCOUNT_ID}/message_templates`,
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
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
  listTemplates: listTemplates,
  createMessageTemplate: createMessageTemplate,
  getMessageData: getMessageData
};
