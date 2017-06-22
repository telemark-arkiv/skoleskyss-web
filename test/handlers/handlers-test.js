'use strict'

const tap = require('tap')
const handlers = require('../../handlers')

tap.equal(Object.keys(handlers).length, 7, 'There are 7 standard handlers')

tap.ok(handlers.getFrontpage, 'Handler has method getFrontpage')

tap.ok(handlers.start, 'Handler has method start')

tap.ok(handlers.checkStart, 'Handler has method checkStart')

tap.ok(handlers.hjelp, 'Handler has method hjelp')

tap.ok(handlers.vilkar, 'Handler has method vilkar')

tap.ok(handlers.personvern, 'Handler has method personvern')

tap.ok(handlers.loggAv, 'Handler has method loggAv')
