'use strict'

const tap = require('tap')
const handlers = require('../../handlers/queue')

tap.equal(Object.keys(handlers).length, 2, 'There are 2 queue handlers')

tap.ok(handlers.getNextFromQueue, 'Handler has method getNextFromQueue')

tap.ok(handlers.deleteFromQueue, 'Handler has method deleteFromQueue')
