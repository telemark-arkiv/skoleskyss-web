'use strict'

const axios = require('axios')
const config = require('../config')
const logger = require('./logger')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['lookup-distance', 'start', data.key, data.origin, data.destination, data.waypoints])
    const url = `${config.DISTANCE_SERVICE}/distance`
    try {
      const result = await axios.post(url, data)
      logger('info', ['lookup-distance', data.key, data.origin, data.destination, data.waypoints, 'success'])
      resolve(result.data)
    } catch (error) {
      logger('info', ['lookup-distance', data.key, data.origin, data.destination, data.waypoints, error])
      reject(error)
    }
  })
}
