'use strict'

module.exports = function extractAddressToGeocode (dsfData) {
  var address = ''

  if (dsfData.GARD) {
    address = dsfData.KOMNR + '-' + parseInt(dsfData.GARD, 10) + '/' + parseInt(dsfData.BRUK, 10)
  } else {
    address = dsfData.ADR + ', ' + dsfData.POSTN + ' ' + dsfData.POSTS
  }

  return address
}
