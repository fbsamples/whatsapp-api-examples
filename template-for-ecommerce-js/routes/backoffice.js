const express = require('express');
const { products } = require("../public/javascripts/products");
const { orders, orderActions, statuses } = require("../public/javascripts/orders");
const { getMessageData, sendWhatsAppMessage } = require("../messageHelper")
const router = express.Router();

const viewModel = products;

router.post('/', async function (req, res, next) {
  const orderId = req.body.orderId;
  const order = orders.filter(o => o.id == orderId)[0]
  order.statusId++;

  const data = getMessageData(process.env.RECIPIENT_PHONE_NUMBER, order);
  try {
    const response = await sendWhatsAppMessage(data)
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  renderBackoffice(res);
});

router.get('/', function (req, res, next) {
  renderBackoffice(res);
});

module.exports = router;
function renderBackoffice(res) {
  res.render('backoffice',
  {
    title: 'e-Commerce Demo for Node.js',
    products: viewModel,
    statuses: statuses,
    orders: orders,
    orderActions: orderActions
  });
}
