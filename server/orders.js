'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db');
const Order = require('APP/db/models/orders');
const OrderItem = require('APP/db/models/orderItem');
const Product = require('APP/db/models/products');

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

customUserRoutes.post('/cart', function(req,res,next) {
	console.log('trying to add item to cart, with: ', req.body);
	
	if (!req.session.cart)
		req.session.cart = [];
	
	req.session.cart.push(req.body);
	console.log('req obj: ', req.session);

	res.status(200).send();
});

customUserRoutes.get('/cart', function(req,res,next) {
	console.log('trying to fetch cart items: ');

	

	// if (!req.session.cart)
	// 	res.sendStatus(200);

	var dummyArr = [{ product_id: 2, quantity: 1 },
	     { product_id: 3, quantity: 1 },
	     { product_id: 4, quantity: 1 } ].map(item=>item.product_id);

	console.log('dummy: ', dummyArr);

	Product.findAll({
		where: {
			id: {
				$in: dummyArr
			}
		}
	})
	.then(result=>{
		console.log(result);
		res.status(200).send(result);
		})
	.catch(next);

	
});