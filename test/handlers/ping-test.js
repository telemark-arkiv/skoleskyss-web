'use strict'

const tap = require('tap')
const pingHandlers = require('../../handlers/ping')

tap.equal(Object.keys(pingHandlers).length, 1, 'There are 1 ping handler')

tap.ok(pingHandlers.ping, 'Handler has method ping')
