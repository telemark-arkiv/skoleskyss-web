'use strict'

const tap = require('tap')
const jwt = require('jsonwebtoken')
const generateToken = require('../../lib/generate-token')
const secret = 'NeverShareYourSecret'
const payload = {
  name: 'zrrrzt',
  description: 'general nice guy'
}
const expected = jwt.sign(payload, secret)
const token = generateToken({key: secret, payload: payload})

tap.equal(expected, token, 'Generates expected token')
