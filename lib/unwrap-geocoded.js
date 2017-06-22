'use strict'

module.exports = function unwrapGeocoded (data) {
  return data.geocoded.lat + ',' + data.geocoded.lon
}
