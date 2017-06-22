'use strict'

const tap = require('tap')
const handlers = require('../../handlers/test')

tap.equal(Object.keys(handlers).length, 4, 'There are 4 test handlers')

tap.ok(handlers.showTest, 'Handler has method showTest')

tap.ok(handlers.setupTest, 'Handler has method setupTest')

tap.ok(handlers.showAvstand, 'Handler has method showAvstand')

tap.ok(handlers.calculateAvstand, 'Handler has method calculateAvstand')
