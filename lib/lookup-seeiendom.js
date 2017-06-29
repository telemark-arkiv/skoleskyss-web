'use strict'

const Seeiendom = require('seeiendom')
const fixAddress = require('tfk-utils-fix-address-for-seeiendom')
const cleanupData = require('./cleanup-seeiendom-data')
const logger = require('./logger')

module.exports = address => {
  return new Promise(async (resolve, reject) => {
    const fixedAddress = fixAddress(address)
    const options = {
      query: fixedAddress
    }

    logger('info', ['lookup-seeiendom', 'address', fixedAddress])

    try {
      const data = await Seeiendom(options)

      if (data.length > 0) {
        logger('info', ['lookup-seeiendom', 'address', fixedAddress, 'got data', data.length])
        const fixedData = cleanupData(data)

        if (fixedData.geocoded) {
          logger('info', ['lookup-seeiendom', 'address', fixedAddress, 'success'])
          resolve(fixedData)
        } else {
          const error = new Error('Could not geocode address')
          logger('error', ['lookup-seeiendom', 'address', fixedAddress, error])
          reject(error)
        }
      } else {
        const error = new Error('Address returned no hits from Seeiendom')
        logger('error', ['lookup-seeiendom', 'address', fixedAddress, error])
        reject(error)
      }
    } catch (error) {
      logger('error', ['lookup-seeiendom', 'address', fixedAddress, 'seeiendom error', error])
      reject(error)
    }
  })
}
