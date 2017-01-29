'use strict'

// This file should be called review.js

const bcrypt = require('bcrypt') // this isn't used
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

  // since this is in a Review table, you can just
  // call this text
  review_text: {
  	type: Sequelize.TEXT,
  	allowNull: false,
    defaultValue: null, // allow null false & default value null??
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
