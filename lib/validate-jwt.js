'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const logger = require('./logger')

module.exports = (request, session, callback) => {
  const credentials = session
  if (!credentials) {
    logger('warn', ['validate-jwt', 'missing credentials'])
    return callback(null, false)
  } else {
    const token = credentials.token
    logger('info', ['validate-jwt', 'got token'])
    jwt.verify(token, config.JWT_SECRET, (error, decoded) => {
      if (error) {
        logger('error', ['validate-jwt', error])
        return callback(null, false)
      } else {
        logger('info', ['validate-jwt', 'success'])
        return callback(null, decoded)
      }
    })
  }
}
