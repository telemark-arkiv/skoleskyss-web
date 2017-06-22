'use strict'

const tap = require('tap')
const routes = require('../../routes')

tap.equal(routes.length, 7, 'There are 7 standard routes')
