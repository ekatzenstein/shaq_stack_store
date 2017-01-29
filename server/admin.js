'use strict'

// Lots of indentation issues here. Need to be consistent

const Order = require('APP/db/models/orders');
const Product = require('APP/db/models/products');
const User = require('APP/db/models/user');
const Promos = require('APP/db/models/promos');

const customAdminRoutes = require('express').Router()

// Custom routes go here.

module.exports = customAdminRoutes

// Epilogue will automatically create standard RESTful routes
// const orders = epilogue.resource({
//   model: db.model('orders'),
//   associations: true,
//   endpoints: ['/orders', '/orders/:id']
// })

// Nice use of middleware!
customAdminRoutes.use((req, res, next) => {
  if (req.user.isAdmin) {
      next();
  } else {
      res.sendStatus(403);
  }
})

customAdminRoutes.get('/users', function(req, res, next) {
  User.findAll()
    .then(users => {
      const usersReceived = users.map(user => user.dataValues)
      res.json({ users: usersReceived, currentUser: req.user})
    })
    .catch(next);
});

customAdminRoutes.delete('/users/:userId', function(req, res, next) {
  User.destroy({
    where: {
      id: req.params.userId
    }
  })
  .then(result => {
    res.sendStatus(200)
  })
  .catch(err => {
    res.send(err)
  })
});

customAdminRoutes.put('/users/:userId', function(req, res, next) {
  User.findOne({
    where: {
      id: req.params.userId
    }
  })
  .then(user => (
    user.update(Object.assign({}, user.dataValues, { // Nice!
      isAdmin: true
    }))
  ))
  .then(result => {
    res.sendStatus(200)
  })
  .catch(err => {
    res.send(err)
  })
});


customAdminRoutes.get('/orders', function(req, res, next) {
  Order.findAll()
    .then(orders => {
      const ordersRecevied = orders.map(order => order.dataValues)
      res.json(ordersRecevied)
    })
    .catch(next);
});

customAdminRoutes.put('/orders/:orderId', function(req, res, next) {
  Order.findOne({
    where: {
      id: req.params.orderId
    }
  })
  .then(order => order.update(req.body))
  .then(result => res.json(result))
  .catch(res.send)
});



customAdminRoutes.get('/products/:productId', function(req, res, next) {
  Product.findOne({
    where: {
      id: req.params.productId
    }
  })
  .then(result => {
    res.send(result.dataValues)
  })
})

customAdminRoutes.put('/products/:productId', function(req, res, next) {
  Product.findOne({
    where: {
      id: req.params.productId
    }
  })
  .then(product => (
    product.update(req.body)
  ))
  .then(result => {
    res.sendStatus(200)
  })
  .catch(err => {
    res.send(err)
  })
});

// customAdminRoutes.get('/promos', function(req, res, next) {
//     Promos.findAll()
//     .then(result => {
//         res.send(result);
//     }).catch(err => {
//         res.send(err)
//     })
// });
