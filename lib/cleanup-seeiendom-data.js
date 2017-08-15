'use strict'

const Converter = require('wgs84-util')

module.exports = data => {
  const validFylkesnummer = ['06', '07', '08', '09']
  const isRegion = item => validFylkesnummer.includes(item.FYLKESNR)
  const isAddress = item => item.hasOwnProperty('ID')
  const list = data.filter(isRegion).filter(isAddress)
  let out = list[0]

  if (out && out.LONGITUDE && out.LATITUDE) {
    const geo = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [out.LONGITUDE, out.LATITUDE]
      },
      properties: {
        zoneLetter: 'N',
        zoneNumber: 32
      }
    }
    const converted = Converter.UTMtoLL(geo)

    out.geocoded = {
      lat: converted.coordinates[1],
      lon: converted.coordinates[0]
    }
  }

  return out
}
