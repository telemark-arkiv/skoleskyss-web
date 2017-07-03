'use strict'

const axios = require('axios')
const config = require('../config')
const logger = require('./logger')
const generateSystemJwt = require('./generate-system-jwt')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    axios.defaults.headers.common['Authorization'] = generateSystemJwt()
    logger('info', ['lookup-distance', 'start', data.key, data.origin, data.destination, `${data.waypoints || 'No waypoints'}`])
    const url = `${config.DISTANCE_SERVICE}/distance`
    try {
      const result = await axios.post(url, data)
      logger('info', ['lookup-distance', data.key, data.origin, data.destination, `${data.waypoints || 'No waypoints'}`, 'success'])
      resolve(result.data)
    } catch (error) {
      logger('info', ['lookup-distance', data.key, data.origin, data.destination, `${data.waypoints || 'No waypoints'}`, error])
      reject(error)
    }
  })
}
