'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const Order = db.define('orders', {
  price: {
  	type: Sequelize.DOUBLE,
  	allowNull: false
  },
  quantity: {
  	type: Sequelize.INTEGER,
  	allowNull: false
  },
  date: {
  	type: Sequelize.DATE,
  	allowNull: false
  },
  address: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  email: {
  	type: Sequelize.STRING,
  	allowNull: true
  },
  status: {
  	type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
  	allowNull: false
  }
});

module.exports = Order;
