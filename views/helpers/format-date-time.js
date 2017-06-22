'use strict'

const monthNames = {
  1: 'januar',
  2: 'februar',
  3: 'mars',
  4: 'april',
  5: 'mai',
  6: 'juni',
  7: 'juli',
  8: 'august',
  9: 'september',
  10: 'oktober',
  11: 'november',
  12: 'desember'
}

function zeroPadding (input) {
  if (input.toString().length === 1) {
    return '0' + input.toString()
  } else {
    return input
  }
}

module.exports = function formatDateTime (datestring) {
  const date = new Date(datestring)
  return date.getDate() + '. ' + monthNames[date.getMonth() + 1] + ' ' + date.getFullYear() + ' - ' + zeroPadding(date.getHours()) + ':' + zeroPadding(date.getMinutes())
}
