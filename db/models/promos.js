'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const Promos = db.define('promos', {
  code: {
   type: Sequelize.STRING,
   allowNull: false
  },
  discount: {
  	type: Sequelize.DOUBLE,
  	allowNull: false
  },
  createDate: Sequelize.DATE,
  expireDate: Sequelize.DATE
  
});

module.exports = Promos;
