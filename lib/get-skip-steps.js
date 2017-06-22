'use strict'

module.exports = function getSkipSteps (store) {
  const completedSteps = Object.keys(store)
  const specialSchoolIds = [
    '3724',
    '39182'
  ]
  var skips = []
  if (completedSteps.indexOf('bosted') > -1) {
    // What to skip if bosted exists
    if (store.bosted.bosted === 'folkeregistrert') {
      skips.push('bostedhybel')
      skips.push('bosteddelt')
    }
    if (store.bosted.bosted === 'hybel') {
      skips.push('bosteddelt')
    }
    if (store.bosted.bosted === 'delt') {
      skips.push('bostedhybel')
    }
  }

  if (completedSteps.indexOf('velgskole') > -1) {
    // What to skip if velgskole exists
    if (store.velgskole.skole !== '0000') {
      skips.push('skoleadresse')
    }
    if (store.velgskole.skole === '0000') {
      skips.push('busskort')
      skips.push('busskortnummer')
    }
  }

  if (completedSteps.indexOf('busskort') > -1) {
    // What to skip if busskort exists
    if (store.busskort.mottattBusskort !== 'ja') {
      skips.push('busskortnummer')
    }
  }

  if (completedSteps.indexOf('duplikatSoknad') > -1) {
    // What to skip if duplikatSoknad exists
    if (!store.duplikatSoknad) {
      skips.push('soknaduendret')
    }
  }

  if (completedSteps.indexOf('tidligereSoknad') > -1) {
    // What to skip if duplikatSoknad exists
    if (!store.tidligereSoknad) {
      skips.push('sokttidligere')
    }
  }

  if (completedSteps.indexOf('velgskole') > -1) {
    // What to skip if velg exists
    if (specialSchoolIds.indexOf(store.velgskole.skole) === -1) {
      skips.push('velgstudieretning')
    }
  }

  return skips
}
