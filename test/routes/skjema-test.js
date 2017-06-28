'use strict'

const tap = require('tap')
const skjemaRoutes = require('../../routes/skjema')

tap.equal(skjemaRoutes.length, 25, 'There are 25 skjema routes')
