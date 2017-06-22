'use strict'

const config = require('../config')
const encryptor = require('simple-encryptor')(config.ENCRYPTOR_SECRET)

module.exports = data => {
  let duplicates = []

  duplicates.push(`${data.dsfData.FODT}${data.dsfData.PERS}`)

  duplicates.push(data.grunnlag.grunnlag)

  duplicates.push(data.velgskole.skole)

  if (data.bosted.bosted === 'folkeregistrert' || data.bosted.bosted === 'delt') {
    const dsfData = data.dsfData
    if (dsfData.GARD) {
      duplicates.push(dsfData.KOMNR + '-' + dsfData.GARD + '/' + dsfData.BRUK)
    } else {
      duplicates.push(dsfData.ADR + dsfData.POSTN + dsfData.POSTS)
    }
  }

  if (data.bosted.bosted === 'delt') {
    const delt = data.bosteddelt
    if (delt.GARD) {
      duplicates.push(delt.KOMNR + '-' + delt.GARD + '/' + delt.BRUK)
    } else {
      duplicates.push(delt.ADR + delt.POSTN + delt.POSTS)
    }
  }

  if (data.bosted.bosted === 'hybel') {
    const hybel = data.bostedhybel
    if (hybel.GARD) {
      duplicates.push(hybel.KOMNR + '-' + hybel.GARD + '/' + hybel.BRUK)
    } else {
      duplicates.push(hybel.ADR + hybel.POSTN + hybel.POSTS)
    }
  }

  let duplicateData = duplicates.join('')

  duplicateData = duplicateData.toLocaleLowerCase()

  duplicateData = duplicateData.replace(/\s/g, '')

  return encryptor.hmac(duplicateData, 'hex')
}
