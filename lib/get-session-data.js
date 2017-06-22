'use strict'

const config = require('../config')
const axios = require('axios')
const encryptor = require('simple-encryptor')(config.ENCRYPTOR_KEY)
const logger = require('./logger')

module.exports = sessionUrl => {
  return new Promise((resolve, reject) => {
    logger('info', ['get-session-data', sessionUrl])
    axios.get(sessionUrl)
      .then(result => {
        logger('info', ['get-session-data', sessionUrl, 'success'])
        resolve(encryptor.decrypt(result.data.value))
      })
      .catch(error => {
        logger('error', ['get-session-data', sessionUrl, error])
        reject(error)
      })
  })
}
