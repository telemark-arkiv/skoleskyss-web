'use strict'

const tap = require('tap')
const routes = require('../../routes/test')

tap.equal(routes.length, 4, 'There are 4 test routes')
