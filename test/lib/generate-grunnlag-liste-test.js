'use strict'

const tap = require('tap')
const generateGrunnlagListe = require('../../lib/generate-grunnlag-liste')
const test3770Folkeregistrert = require('../data/folkeregistrert-3770-test.json')
const test3770Delt = require('../data/delt-3770-test.json')
const test3770Hybel = require('../data/hybel-3770-test.json')
const test3681Folkeregistrert = require('../data/folkeregistrert-3681-test.json')
const test3681Delt = require('../data/delt-3681-test.json')
const test3681Hybel = require('../data/hybel-3681-test.json')

tap.equal(3, generateGrunnlagListe(test3770Folkeregistrert).length, 'It returns expected result for 3770 folkeregistrert')

tap.equal(3, generateGrunnlagListe(test3770Delt).length, 'It returns expected result for 3770 delt')

tap.equal(3, generateGrunnlagListe(test3770Hybel).length, 'It returns expected result for 3770 hybel')

tap.equal(2, generateGrunnlagListe(test3681Folkeregistrert).length, 'It returns expected result for 3681 folkeregistrert')

tap.equal(2, generateGrunnlagListe(test3681Delt).length, 'It returns expected result for 3681 delt')

tap.equal(2, generateGrunnlagListe(test3681Hybel).length, 'It returns expected result for 3681 hybel')
