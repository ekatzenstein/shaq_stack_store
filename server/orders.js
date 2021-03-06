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
	// console.log('cart is: ', cart);
	Order.create(req.body)
	.then(order => {
		var cartWithOrderId = cart.map(
			function(item)
			{

				var obj =
					{
						price: item.product.current_price,
						quantity: item.quantity,
						product_id: item.product.id,
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
	if (!Array.isArray(req.session.cart))
		req.session.cart = [];

	const newProductId = req.body.product_id*1;

	const indexOfNewProduct = req.session.cart.map(item => item.product_id).indexOf(newProductId);
	console.log('indexOfNewProduct: ', indexOfNewProduct);

	if ( indexOfNewProduct == -1)  //product doesn't exist
		req.session.cart.push(
			{
				product_id: req.body.product_id*1,
				quantity: req.body.quantity*1
			});
	else
		req.session.cart[indexOfNewProduct].quantity += req.body.quantity*1;

	console.log('updated cart', req.session.cart);
	res.status(200).send();
});

customUserRoutes.post('/cart/update', function(req,res,next) {

	console.log('received: ', req.body);
	req.session.cart = req.body.map(item=> {
		return ({
			product_id: item.product.id*1,
			quantity: item.quantity*1,
			discount: item.discount*1
		})
	});


	console.log('updated cart', req.session.cart);
	res.status(200).send();
});

customUserRoutes.post('/cart/empty', function(req,res,next) {
	req.session.cart = [];
	req.session.promo = undefined;
	res.status(200).send();
});

customUserRoutes.post('/cart/promos/:code', function(req,res,next) {
	console.log('updating promo code on session', req.params.code);
	req.session.promo = req.params.code;
	res.status(200).send();
});

customUserRoutes.get('/cart/promos', function(req,res,next) {
	console.log('sending back promo: ', req.session.promo);
	res.status(200).send(req.session.promo);
});

customUserRoutes.get('/cart', function(req,res,next) {

	var cartIdArray = req.session.cart.map(item=>item.product_id*1);
	var cartQuantityArray = req.session.cart.map(item=>item.quantity*1);
	var cartDiscountArray = req.session.cart.map(item=>item.discount*1);

	console.log('cartIdArray: ',cartIdArray);
	console.log('cartQuantityArray: ', cartQuantityArray);
	console.log('cartDiscountArray: ', cartDiscountArray);

	Product.findAll({
		where: {
			id: {
				$in: cartIdArray
			}
		}
	})
	.then(result=>{
		const productArray = result.map((p,i)=> {
			//console.log('p: ', p);
			var productArrIndex = cartIdArray.indexOf(p.dataValues.id*1);
			console.log('prod index: ', productArrIndex);
			console.log('cartQuantityArray: ', cartQuantityArray);
			console.log('qty: ', cartQuantityArray[productArrIndex]);
			return (
				{
					id:i,
					product:p.dataValues,
					quantity:cartQuantityArray[productArrIndex],
					cost:p.current_price * cartQuantityArray[productArrIndex],
					discount: cartDiscountArray[productArrIndex]
				}
			)
		});
		console.log('cart array with quantities: ',productArray);
		res.status(200).send(productArray);
		})
	.catch(next);


});
