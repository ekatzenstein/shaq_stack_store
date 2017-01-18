'use strict'

const epilogue = require('./epilogue')
const db = require('APP/db')

const customUserRoutes = require('express').Router() 

// Custom routes go here.

module.exports = customUserRoutes

// Epilogue will automatically create standard RESTful routes
const promos = epilogue.resource({
  model: db.model('promos'),
  associations: true,
  endpoints: ['/promos', '/promos/:code']
})

