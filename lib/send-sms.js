'use strict'

const axios = require('axios')
const config = require('../config')
const generateSystemJwt = require('./generate-system-jwt')
const logger = require('./logger')

function fixPhoneNumber (phone) {
  const compactNumber = parseInt(phone.toString().replace(/\s/g, ''), 10)
  return compactNumber.toString().startsWith('47') ? compactNumber : `47${compactNumber}`
}

module.exports = phonenumber => {
  return new Promise(async (resolve, reject) => {
    axios.defaults.headers.common['Authorization'] = generateSystemJwt()
    const mobile = fixPhoneNumber(phonenumber)
    const payload = {
      sender: config.SMS_SENDER_NAME,
      receivers: [mobile],
      message: '270D27130020005300F8006B006E006100640020006D006F007400740061007400740020263A270C',
      operation: 9
    }
    const url = `${config.SMS_SERVICE}/sms`
    logger('info', ['send-sms', 'phone', mobile, 'ready'])
    try {
      const result = await axios.post(url, payload)
      logger('info', ['send-sms', 'phone', mobile, 'success'])
      resolve(result.data)
    } catch (error) {
      logger('info', ['send-sms', 'phone', mobile, error])
      reject(error)
    }
  })
}
