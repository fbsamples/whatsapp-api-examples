/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const messageTemplates = [
  {
    name: 'welcome',
    category: 'TRANSACTIONAL',
    components: [{
      type: 'BODY',
      text: 'Hi, {{1}}! How great to have you here 😃'
      + '\n'
      + '\nNow, as soon as you buy with us, you will receive automatic messages about the progress of your order here.'
      + '\n'
      + '\nAnd whenever you want, you can ask about your latest orders, our offer of the day or the addresses and opening hours of our physical stores.',
      example: { body_text: [ [ 'Bob'] ] }
    }],
    language: 'en_US',
    modelFields: ['firstName']
  },
  {
    name: 'payment_analysis',
    category: 'TRANSACTIONAL',
    components: [{
      type: 'BODY',
      text: 'Hello, {{1}}!'
      + '\n'
      + '\nThank you for shopping with us ❤️'
      + '\n'
      + '\nWe received the order for the product {{2}} and now we are just waiting for the payment to be approved.'
      + '\n'
      + '\nTo know about your purchase anytime, just send a message here and we\'ll tell you :)',
      example: { body_text: [ [ 'Bob', 'Olive Oil'] ] }
    }],
    language: 'en_US',
    modelFields: [ 'firstName', 'productName']
  },
  {
    name: 'payment_approved',
    category: 'TRANSACTIONAL',
    components: [{
      type: 'BODY',
      text: 'Hello, {{1}}!'
      + '\n'
      + '\nPayment for order {{2}} has been approved ❤️'
      + '\n'
      + '\nWe are working to have your order delivered by {{3}}.',
      example: { body_text: [ [ 'Bob', '02-953022600', 'June 9' ] ] }
    }],
    language: 'en_US',
    modelFields: [ 'firstName', 'orderNumber', 'deliveryDate']
  },
  {
    name: 'invoice_available',
    category: 'TRANSACTIONAL',
    components: [{
      type: 'BODY',
      text: 'Hello, {{1}}!'
      + '\n'
      + '\nYou can download the invoice for the product {{2}} here: {{3}}.',
      example: { body_text: [ [ 'Bob', 'OLIVE OIL', 'https://customer.your-awesome-grocery-store-demo.com/my-account/orders/02-953022600' ] ] }
    }],
    language: 'en_US',
    modelFields: [ 'firstName', 'productName', 'orderUrl']
  },
  {
    name: 'order_picked_packed',
    category: 'TRANSACTIONAL',
    components: [{
      type: 'BODY',
      text: 'Hello, {{1}}!'
      + '\n'
      + '\nOrder {{2}} has already been picked and packed 📦'
      + '\n'
      + '\nAnd it\'s ready to get to you soon.'
      + '\n'
      + '\nIf you want to track shipping, it\'s here 👉 {{3}}',
      example: { body_text: [ [ 'Bob', '02-950515063', 'https://customer.your-awesome-grocery-store-demo.com/my-account/orders/02-953022600' ] ] }
    }],
    language: 'en_US',
    modelFields: [ 'firstName', 'orderNumber', 'orderUrl']
  },
  {
    name: 'order_in_transit',
    category: 'TRANSACTIONAL',
    components: [{
      type: 'BODY',
      text: 'Hello {{1}}, your order {{2}} is already on its way and will be delivered to you on {{3}} :)'
      + '\n'
      + '\nIf you don\'t have a way to get it, let someone close to receive it for you, okay?'
      + '\n'
      + '\nYou can also track the shipment anytime here 👉 {{4}}',
      example: { body_text: [ [ 'Bob', '02-950515063', 'June 09', 'https://customer.your-awesome-grocery-store-demo.com/my-account/orders/02-953022600' ] ] }
    }],
    language: 'en_US',
    modelFields: [ 'firstName', 'orderNumber', 'deliveryDate', 'orderUrl']
  },
  {
    name: 'order_delivered',
    category: 'TRANSACTIONAL',
    components: [{
      type: 'BODY',
      text: 'Hello {{1}}, order {{2}} has been delivered!'
      + '\n'
      + '\nEnjoy it! 🎉'
      + '\n'
      + '\nIf you have any problems and want to exchange or return, the deadline is {{3}} calendar days. To order, just enter the My Account section of the website or app, find the product(s) in My Orders and click on exchange or return. We only do not exchange if there are signs that the product has been used, such as damaged labels and broken seals, ok?'
      + '\n'
      + '\nThanks for shopping with us!'
      + '\n'
      + '\nSee you later 👋',
      example: { body_text: [ [ 'Bob', '02-950515063', '7' ] ] }
    }],
    language: 'en_US',
    modelFields: [ 'firstName', 'orderNumber', 'deadlineDays' ]
  }
]

if (exports) {
  exports.messageTemplates = messageTemplates;
}
