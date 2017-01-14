'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db');
const Order = require('APP/db/models/orders');
const OrderItem = require('APP/db/models/orderItem');
const Product = require('APP/db/models/products');

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
    }).catch(err=>{
        res.send(err)
    })
});
