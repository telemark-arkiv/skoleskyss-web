'use strict'

const steps = [
  'seover',
  'busskortnummer',
  'busskort',
  'grunnlag',
  'velgstudieretning',
  'velgklasse',
  'skoleadresse',
  'velgskole',
  'bosteddelt',
  'bostedhybel',
  'bosted'
]

module.exports = function getNextForm (store) {
  const completedSteps = Object.keys(store)
  var nextForm = 'seover'

  steps.forEach(function (step) {
    if (completedSteps.indexOf(step) === -1) {
      nextForm = step
    }
  })
  return nextForm
}
