'use strict';


// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Product = require('./products')
const Review = require('./reviews');
const Order = require('./orders');
const OrderItem = require('./orderItem');
const Promos = require('./promos');


module.exports = {User, Product, Review, Order, OrderItem, Promos};

User.hasMany(Order);
Order.belongsTo(User);


Product.belongsToMany(Order, {through: 'orderItems'});
Order.belongsToMany(Product, {through: 'orderItems'});

OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);

Product.hasMany(Review);
User.hasMany(Review);
Review.belongsTo(Product);
Review.belongsTo(User);


Promos.hasMany(Product);
Product.belongsTo(Promos);
