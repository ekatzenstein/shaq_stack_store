'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const customUserRoutes = require('express').Router()

// Custom routes go here.

module.exports = customUserRoutes

// Epilogue will automatically create standard RESTful routes
const reviews = epilogue.resource({
  model: db.model('reviews'),
  endpoints: ['/reviews','/reviews/:product_id']
})
