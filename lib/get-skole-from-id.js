'use strict'

module.exports = function getSkoleFromId (id) {
  const skoler = require('./data/skoler.json')
  var skole = ''
  skoler.forEach(function (item) {
    if (item.id === id) {
      skole = item
    }
  })
  return skole
}
