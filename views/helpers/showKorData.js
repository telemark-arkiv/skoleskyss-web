'use strict'

module.exports = function korData (korData) {
  var info = ''

  if (korData.MobilePhone) {
    info = 'Mobilnummer: ' + korData.MobilePhone + '<br />'
  }

  if (korData.Email) {
    info += 'Epostadresse: ' + korData.Email
  }

  return info
}
