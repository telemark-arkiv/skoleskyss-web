'use strict'

const tap = require('tap')
const cleanupData = require('../../lib/cleanup-seeiendom-data')
const data = require('../data/seeiendom.json')
const converted = cleanupData(data)

tap.equal(converted.geocoded.lat, 59.1033201255, 'latitude is ok')

tap.equal(converted.geocoded.lon, 9.5552224939, 'longitude is ok')
