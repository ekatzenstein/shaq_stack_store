'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const OrderItem = db.define('orderItems', {
  price: {
   type: Sequelize.DOUBLE,
   allowNull: false
  },
  quantity: {
   type: Sequelize.INTEGER,
   allowNull: false
  }
});

module.exports = OrderItem;
