'use strict'

module.exports = function showDsfPersonalia (dsfData) {
  return 'Navn: ' + dsfData.NAVN + '<br />' + 'Fødselsnummer: ' + dsfData.FODT.toString() + dsfData.PERS.toString()
}
