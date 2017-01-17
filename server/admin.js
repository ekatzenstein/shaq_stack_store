'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db');
const Order = require('APP/db/models/orders');
const OrderItem = require('APP/db/models/orderItem');
const Product = require('APP/db/models/products');
const User = require('APP/db/models/user');

const customAdminRoutes = require('express').Router()

// Custom routes go here.

module.exports = customAdminRoutes

// Epilogue will automatically create standard RESTful routes
// const orders = epilogue.resource({
//   model: db.model('orders'),
//   associations: true,
//   endpoints: ['/orders', '/orders/:id']
// })
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
            const usersReceived = users.map(user => {
                return (user.dataValues)
            })
            res.json(usersReceived)
        })
        .catch(next);
});

customAdminRoutes.delete('/users/:userId', function(req, res, next) {
    User.destroy({
            where: {
                id: req.params.userId
            }
        }).then(result => {
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
        }).then(user => {
            return user.update(Object.assign({}, user.dataValues, {
                isAdmin: true
            }))
        })
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
            const ordersRecevied = orders.map(order => {
                return (order.dataValues)
            })
            res.json(ordersRecevied)
        })
        .catch(next);
});

customAdminRoutes.put('/orders/:orderId', function(req, res, next) {
    Order.findOne({
        where: {
            id: req.params.orderId
        }
    }).then(order => {
        return order.update(req.body)
    }).then(result => {
        res.json(result)
    }).catch(err => {
        res.send(err)
    })
});



customAdminRoutes.get('/products/:productId', function(req, res, next) {
    Product.findOne({
        where: {
            id: req.params.productId
        }
    }).then(result => {
        res.send(result.dataValues)
    })
})

customAdminRoutes.put('/products/:productId', function(req, res, next) {
    Product.findOne({
        where: {
            id: req.params.productId
        }
    }).then(product => {
        return product.update(req.body)
    }).then(result => {
        res.sendStatus(200)
    }).catch(err => {
        res.send(err)
    })
});
