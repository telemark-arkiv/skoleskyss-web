'use strict'

const tap = require('tap')
const generateDuplicateHash = require('../../lib/generate-duplicate-hash')
const bostedDelt = require('../data/bosted-delt-grunnlag.json')
const bostedDsf = require('../data/bosted-dsf-grunnlag.json')

tap.equal(generateDuplicateHash(bostedDelt.data), bostedDelt.expectedHash, 'it generates expected hash for bostedDelt')

tap.equal(generateDuplicateHash(bostedDsf.data), bostedDsf.expectedHash, 'it generates expected hash for bostedDsf')
