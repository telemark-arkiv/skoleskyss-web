'use strict'

module.exports = (document) => {
  var merknader = []

  if (document.tidligereSoknad) {
    merknader.push('Har søkt tidligere')
    if (document.duplikatSoknad) {
      merknader.push('Ingen nye opplysninger')
    } else {
      merknader.push('Opplysninger er endret')
    }
  } else {
    merknader.push('Ingen merknader')
  }

  return merknader.join('<br />')
}
