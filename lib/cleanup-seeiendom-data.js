'use strict'

const Converter = require('wgs84-util')

module.exports = data => {
  const isTelemark = item => item.FYLKESNR === '08'
  const list = data.filter(isTelemark)
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
