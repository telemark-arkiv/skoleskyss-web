'use strict'

const axios = require('axios')
const generateSystemJwt = require('./generate-system-jwt')
const config = require('../config')
const logger = require('./logger')

module.exports = applicantId => {
  return new Promise(async (resolve, reject) => {
    axios.defaults.headers.common['Authorization'] = generateSystemJwt()
    const url = `${config.LOGS_SERVICE}/logs/search`
    const query = {applicantId: applicantId}
    logger('info', ['check-previous-applications', 'applicantId', applicantId])
    try {
      const result = await axios.post(url, query)
      const previous = result.data.length
      logger('info', ['check-previous-applications', 'applicantId', applicantId, 'previous applications', previous])
      resolve(previous > 0)
    } catch (error) {
      logger('error', ['check-previous-applications', 'applicantId', applicantId, error])
      reject(error)
    }
  })
}
