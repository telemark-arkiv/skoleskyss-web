'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const tokenOptions = {
  expiresIn: '1h',
  issuer: 'https://auth.t-fk.no'
}
const data = {
  cn: 'Bernhard Riemann',
  userId: 'riemann'
}

const token = jwt.sign(data, config.SKOLESKYSS_JWT_SECRET, tokenOptions)

console.log(token)
