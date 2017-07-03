'use strict'

const tap = require('tap')
const generateGrunnlagListe = require('../../lib/generate-grunnlag-liste')
const test3781Folkeregistrert = require('../data/folkeregistrert-3781-test.json')
const test3781Delt = require('../data/delt-3781-test.json')
const test3781Hybel = require('../data/hybel-3781-test.json')
const test3681Folkeregistrert = require('../data/folkeregistrert-3681-test.json')
const test3681Delt = require('../data/delt-3681-test.json')
const test3681Hybel = require('../data/hybel-3681-test.json')

tap.equal(3, generateGrunnlagListe(test3781Folkeregistrert).length, 'It returns expected result for 3781 folkeregistrert')

tap.equal(3, generateGrunnlagListe(test3781Delt).length, 'It returns expected result for 3781 delt')

tap.equal(3, generateGrunnlagListe(test3781Hybel).length, 'It returns expected result for 3781 hybel')

tap.equal(2, generateGrunnlagListe(test3681Folkeregistrert).length, 'It returns expected result for 3681 folkeregistrert')

tap.equal(2, generateGrunnlagListe(test3681Delt).length, 'It returns expected result for 3681 delt')

tap.equal(2, generateGrunnlagListe(test3681Hybel).length, 'It returns expected result for 3681 hybel')
