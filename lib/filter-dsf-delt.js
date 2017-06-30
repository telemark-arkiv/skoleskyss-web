'use strict'

const extractAddress = require('./extract-address-to-geocode')

module.exports = data => {
  const originalAddress = extractAddress(data)
  let result = false

  if (data.FOR && Array.isArray(data.FOR) && data.FOR.length > 0) {
    const alternativeAddress = data.FOR.filter(item => extractAddress(item) !== originalAddress)
    if (alternativeAddress.length === 1) {
      result = alternativeAddress[0]
    }
  }

  return result
}
