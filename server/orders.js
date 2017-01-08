'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db');
const Order = require('APP/db/models/orders');
const OrderItem = require('APP/db/models/orderItem');

const customUserRoutes = require('express').Router() 

// Custom routes go here.

module.exports = customUserRoutes

// Epilogue will automatically create standard RESTful routes
// const orders = epilogue.resource({
//   model: db.model('orders'),
//   associations: true,
//   endpoints: ['/orders', '/orders/:id']
// })


customUserRoutes.post('/',function(req, res, next){

	const cart = req.body.cart;
	console.log('cart is: ', cart);
	Order.create(req.body)
	.then(order => {
		var cartWithOrderId = cart.map(
			function(item) 
			{ 	
				
				var obj = 
					{
						price: item.product.current_price, 
						quantity: item.quantity, 
						product_id: item.product.product_id, 
						order_id: order.id
					}

				console.log('obj: ', obj);
				return obj;

			});
		return OrderItem.bulkCreate(cartWithOrderId);

	})
	.then(items => res.json(items))
	//.then(order => res.json(order))
	.catch(next);

});

