'use strict'

// This file should be called product.js

const Sequelize = require('sequelize');
const db = require('APP/db');

const Product = db.define('products', {
  title: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  // why is this an Array of strings?
  // If things have multiple categories you probably want that
  // relation to be modeled in the DB somehow:
  // Product.hasMany(Category)
  category: Sequelize.ARRAY(Sequelize.STRING),
  photo_url: Sequelize.STRING,
  current_price: { // would just call this "price"
  	type: Sequelize.DOUBLE,
  	allowNull: false
  },
  description: {
  	type: Sequelize.TEXT,
  	allowNull: false
  },
  // You technically already have availability through
  // inventory (true when inventory > 0)
  // Having another field is just one more thing to keep
  // in sync
  availability: {
  	type: Sequelize.BOOLEAN,
  	allowNull: false
  },
  inventory: {
  	type: Sequelize.INTEGER,
  	allowNull: false
  }
});

module.exports = Product;
