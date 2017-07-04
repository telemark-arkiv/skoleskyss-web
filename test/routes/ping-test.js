'use strict'

const tap = require('tap')
const pingRoutes = require('../../routes/ping')

tap.equal(pingRoutes.length, 1, 'There are 1 ping route')
