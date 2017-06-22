'use strict'

const tap = require('tap')
const routes = require('../../routes/queue')

tap.equal(routes.length, 2, 'There are 2 queue routes')
