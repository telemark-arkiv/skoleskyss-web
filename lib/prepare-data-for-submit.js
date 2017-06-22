'use strict'

const getSkoleFromId = require('./get-skole-from-id')
const envs = process.env

module.exports = function prepareDataForSubmit (request, callback) {
  const yar = request.yar
  const sessionId = yar.id
  const store = yar._store
  const storeKeys = Object.keys(store)
  const velgskole = yar.get('velgskole')
  const eksternSkole = yar.get('skoleadresse')
  const skoleData = eksternSkole ? {name: eksternSkole.skoleNavn + ', ' + eksternSkole.skoleFylke} : getSkoleFromId(velgskole.skole)
  var document = {
    skoleData: skoleData,
    skjemaUtfyllingStop: new Date().getTime(),
    CALLBACK_STATUS_URL: envs.SKOLESKYSS_CALLBACK_STATUS_URL,
    userAgent: request.headers['user-agent']
  }

  storeKeys.forEach(function (key) {
    document[key] = store[key]
  })

  request.seneca.act({role: 'session', cmd: 'get', sessionId: sessionId}, function (error, data) {
    if (error) {
      callback(error, null)
    } else {
      data.forEach(function (item) {
        document[item.key] = item
      })
      callback(null, document)
    }
  })
}
