'use strict'

const axios = require('axios')
const generateSystemJwt = require('./generate-system-jwt')
const config = require('../config')
const logger = require('./logger')

module.exports = document => {
  return new Promise(async (resolve, reject) => {
    axios.defaults.headers.common['Authorization'] = generateSystemJwt()
    const url = `${config.LOGS_SERVICE}/logs`
    logger('info', ['save-application', 'applicantId', document.applicantId])
    try {
      const result = await axios.put(url, document)
      const data = result.data
      logger('info', ['save-application', 'applicantId', document.applicantId, 'id', data._id, 'success'])
      resolve(true)
    } catch (error) {
      logger('error', ['save-application', 'applicantId', document.applicantId, error])
      reject(error)
    }
  })
}
