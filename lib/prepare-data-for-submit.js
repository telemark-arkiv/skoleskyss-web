'use strict'

const getSkoleFromId = require('./get-skole-from-id')
const generateDuplicateHash = require('./generate-duplicate-hash')
const logger = require('./logger')
const config = require('../config')

module.exports = function prepareDataForSubmit (request, callback) {
  const yar = request.yar
  const applicantId = yar.get('applicantId')
  const store = yar._store
  const storeKeys = Object.keys(store)
  const velgskole = yar.get('velgskole')
  const eksternSkole = yar.get('skoleadresse')
  const skoleData = eksternSkole ? {name: eksternSkole.skoleNavn + ', ' + eksternSkole.skoleFylke} : getSkoleFromId(velgskole.skole)
  let document = {
    skoleData: skoleData,
    skjemaUtfyllingStop: new Date().getTime(),
    CALLBACK_STATUS_URL: config.SKOLESKYSS_CALLBACK_STATUS_URL,
    userAgent: request.headers['user-agent']
  }

  logger('info', ['prepare-data-for-submit', 'applicantId', applicantId])
  storeKeys.forEach(key => {
    document[key] = store[key]
  })
  document.duplicateHash = generateDuplicateHash(document)
  callback(null, document)
}
