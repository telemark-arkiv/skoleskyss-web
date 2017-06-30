'use strict'

const axios = require('axios')
const generateSystemJwt = require('./generate-system-jwt')
const config = require('../config')
const logger = require('./logger')

module.exports = document => {
  return new Promise(async (resolve, reject) => {
    axios.defaults.headers.common['Authorization'] = generateSystemJwt()
    const applicantId = document.applicantId
    const url = `${config.LOGS_SERVICE}/logs/search`
    const query = {applicantId: applicantId, duplicateHash: document.duplicateHash}
    logger('info', ['check-duplicate-applications', applicantId])
    try {
      const result = await axios.post(url, query)
      const duplicates = result.data.length
      logger('info', ['check-duplicate-applications', applicantId, 'duplicates', duplicates])
      resolve(duplicates > 0)
    } catch (error) {
      logger('error', ['check-duplicate-applications', applicantId, error])
      reject(error)
    }
  })
}
