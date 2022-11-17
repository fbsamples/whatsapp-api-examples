/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

const orders = [
  { id: '02-953022600', total: 123.99, statusId: 1,
    customer: 'Lorena Mustafa',
    items: [
      { productId: 3, qty: 3 },
      { productId: 4, qty: 2 },
      { productId: 7, qty: 5 },
    ],
    deliveryDate: 'June 9' },
    { id: '02-953522877', total:  98.99, statusId: 4,
    customer: 'Lance Murphy',
    items: [
      { productId: 12, qty: 1 },
      { productId: 13, qty: 4 },
    ],
    deliveryDate: 'July 2' },
    { id: '02-953328975', total:  23.99, statusId: 3,
    customer: 'Hector Wilson',
    items: [
      { productId: 9, qty: 6 },
    ],
    deliveryDate: 'August 19' },
    { id: '02-953276212', total:  54.99, statusId: 2,
    customer: 'Natalia Castillo',
    items: [
      { productId: 7, qty: 1 },
      { productId: 8, qty: 2 },
      { productId: 9, qty: 1 },
    ],
    deliveryDate: 'January 23' },
    { id: '02-953893345', total:  12.99, statusId: 5,
    customer: 'Leon Paulauskas',
    items: [
      { productId: 13, qty: 2 },
      { productId: 14, qty: 4 },
    ],
    deliveryDate: 'December 31' },
    { id: '02-953977612', total: 127.99, statusId: 7,
    customer: 'Itai Jordaan',
    items: [
    { productId: 16, qty: 4 },
    { productId: 2, qty: 3 }
  ],
  deliveryDate: 'April 9' },
  { id: '02-953823441', total:  87.99, statusId: 6,
  customer: 'Alpa Prats',
  items: [
    { productId: 15, qty: 3 },
    { productId: 11, qty: 2 },
  ],
  deliveryDate: 'March 20' },
]

const statuses = ['shopping cart', 'payment analysis', 'payment approved', 'invoice available', 'order packed', 'order in transit', 'order delivered']

const orderActions = ['Checkout', 'Approve', 'Invoice', 'Pack', 'Ship', 'Deliver', '']

if (exports) {
  exports.orders = orders;
  exports.statuses = statuses;
  exports.orderActions = orderActions;
}
