'use strict'

// These aren't used
// const epilogue = require('./epilogue')
// const db = require('APP/db');
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
	Order.create(req.body)
	.then(order => (
    OrderItem.bulkCreate(
      req.body.cart.map((item) => ({
        price: item.product.current_price,
        quantity: item.quantity,
        product_id: item.product.id,
        order_id: order.id
      }))
    )
	))
	.then(items => res.json(items))
	.catch(next);
});

customUserRoutes.post('/cart', function(req,res,next) {
  req.session.cart = req.session.cart || []

	const productId = parseInt(req.body.product_id)
	const quantity = parseInt(req.body.quantity)
  const index = req.session.cart.find(item => item.product_id === productId)

  if (index) // product in cart
		req.session.cart[index].quantity += quantity
  else
		req.session.cart.push({
      product_id: productId,
      quantity: quantity
    });

	console.log('updated cart', req.session.cart);
	res.status(200).send();
});

customUserRoutes.post('/cart/update', function(req,res,next) {
	console.log('received: ', req.body);

	req.session.cart = req.body.map(item => ({
    product_id: parseInt(item.product.id),
    quantity: parseInt(item.quantity),
    discount: parseInt(item.discoun)
  }));

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
	var ids = req.session.cart.map(item => parseInt(item.product_id));
	var quantities = req.session.cart.map(item => parseInt(item.quantity));
	var discounts = req.session.cart.map(item => parseInt(item.discount));

	console.log('cartIdArray: ', ids);
	console.log('cartQuantityArray: ', quantities);
	console.log('cartDiscountArray: ', discounts);

	Product.findAll({
		where: {
			id: {
				$in: ids
			}
		}
	})
	.then(result => {
		const products = result.map((product, index) => {
      let index = ids.indexOf(parseInt(product.dataValues.id));

			console.log('prod index: ', ids);
			console.log('cartQuantityArray: ', quantities);
			console.log('qty: ', quantities[index]);

			return (
				{
					id: index,
					product: product.dataValues,
					quantity: quantities[index],
					cost: product.current_price * quantities[index],
					discount: discounts[index]
				}
			)
		});

		console.log('cart array with quantities: ',productArray);
		res.status(200).send(productArray);
  })
	.catch(next);
});
