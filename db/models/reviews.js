'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')

const Review = db.define('reviews', {
  rating: {
  	type: Sequelize.INTEGER,
  	allowNull: false,
  	defaultValue: 5,
    validate: {
			notEmpty: true,
			isNumeric: true,
			max: 5,
			min: 1,
		}
  },

  review_text: {
  	type: Sequelize.TEXT,
  	allowNull: false,
  	defaultValue: null,
  	validate: {
  		notEmpty: true,
  	}
  }
})

module.exports = Review;


// reviews_id (pk)
// users_id (fk)
// product_id (fk)
// review_text
// ratings - default value 0
