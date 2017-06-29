'use strict'

const test = require('ava')
const generateDuplicateHash = require('../../lib/generate-duplicate-hash')
const bostedDelt = require('../data/bosted-delt-grunnlag.json')
const bostedDsf = require('../data/bosted-dsf-grunnlag.json')

test('it generates expected hash for bostedDelt', t => {
  t.deepEqual(generateDuplicateHash(bostedDelt.data), bostedDelt.expectedHash, 'expected value OK')
})

test('it generates expected hash for bostedDsf', t => {
  t.deepEqual(generateDuplicateHash(bostedDsf.data), bostedDsf.expectedHash, 'expected value OK')
})
