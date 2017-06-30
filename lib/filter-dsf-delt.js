'use strict'

const extractAddress = require('./extract-address-to-geocode')

module.exports = data => {
  const originalAddress = extractAddress(data)
  let result = false

  if (data.FOR && Array.isArray(data.FOR) && data.FOR.length > 0) {
    const alternativeAddresses = data.FOR.filter(item => extractAddress(item) !== originalAddress)
    const alternativeAddress = alternativeAddresses.reduce((addresses, thisAddress) => {
      // Removes duplicate addresses
      if (!addresses.map(address => extractAddress(address)).includes(extractAddress(thisAddress))) {
        addresses.push(thisAddress)
      }
      return addresses
    }, [])
    if (alternativeAddress.length === 1) {
      result = alternativeAddress[0]
    }
  }

  return result
}
