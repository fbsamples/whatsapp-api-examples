const orders = [
  { id: '02-953022600', total: 123.99, statusId: 1, 
    customer: 'Brooklyn Floyd', 
    items: [ 
      { productId: 3, qty: 3 },
      { productId: 4, qty: 2 },
      { productId: 7, qty: 5 },
    ],
    deliveryDate: 'June 9' },
    { id: '02-953522877', total:  98.99, statusId: 4, 
    customer: 'Camila Reyes', 
    items: [ 
      { productId: 12, qty: 1 },
      { productId: 13, qty: 4 },
    ],
    deliveryDate: 'July 2' },
    { id: '02-953328975', total:  23.99, statusId: 3, 
    customer: 'Marley Woods', 
    items: [ 
      { productId: 9, qty: 6 },
    ],
    deliveryDate: 'August 19' }, 
    { id: '02-953276212', total:  54.99, statusId: 2, 
    customer: 'Mila Harrison', 
    items: [ 
      { productId: 7, qty: 1 },
      { productId: 8, qty: 2 },
      { productId: 9, qty: 1 },
    ],
    deliveryDate: 'January 23' },
    { id: '02-953893345', total:  12.99, statusId: 5, 
    customer: 'Wyatt Fuller', 
    items: [ 
      { productId: 13, qty: 2 },
      { productId: 14, qty: 4 },
    ],
    deliveryDate: 'December 31' },
    { id: '02-953977612', total: 127.99, statusId: 7, 
    customer: 'Cecilia Peterson', 
    items: [ 
    { productId: 16, qty: 4 },
    { productId: 2, qty: 3 }
  ],
  deliveryDate: 'April 9' },
  { id: '02-953823441', total:  87.99, statusId: 6, 
  customer: 'Liam Ross', 
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
