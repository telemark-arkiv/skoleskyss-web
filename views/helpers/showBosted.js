'use strict'

const showDsfBosted = require('./showDsfBosted')

module.exports = data => {
  let outputs = []

  if (data.bosted.bosted === 'folkeregistrert') {
    outputs.push('Hjemme, på folkeregistrert bosted')
    outputs.push(showDsfBosted(data.dsfData))
    if (data['distance-see-dsf']) {
      outputs.push('Foreløpig beregnet avstand til skole: ' + data['distance-see-dsf'].distance)
      outputs.push('<a href="' + data['distance-see-dsf'].staticMapUrl + '" target="_blank">Se beregnet rute</a>')
    }
  }

  if (data.bosted.bosted === 'delt') {
    outputs.push('Delt bosted')
    outputs.push('Folkeregistrert bosted')
    outputs.push(showDsfBosted(data.dsfData))
    if (data['distance-see-dsf']) {
      outputs.push('Foreløpig beregnet avstand til skole: ' + data['distance-see-dsf'].distance)
      outputs.push('<a href="' + data['distance-see-dsf'].staticMapUrl + '" target="_blank">Se beregnet rute</a>')
    }
    outputs.push('')
    outputs.push('Bosted nummer to')
    outputs.push(showDsfBosted(data.bosteddelt))
    if (data['distance-see-delt']) {
      outputs.push('Foreløpig beregnet avstand til skole: ' + data['distance-see-delt'].distance)
      outputs.push('<a href="' + data['distance-see-delt'].staticMapUrl + '" target="_blank">Se beregnet rute</a>')
    }
  }

  if (data.bosted.bosted === 'hybel') {
    outputs.push('Hybel')
    outputs.push(showDsfBosted(data.bostedhybel))
    if (data['distance-see-hybel']) {
      outputs.push('Foreløpig beregnet avstand til skole: ' + data['distance-see-hybel'].distance)
      outputs.push('<a href="' + data['distance-see-hybel'].staticMapUrl + '" target="_blank">Se beregnet rute</a>')
    }
  }
  return outputs.join('<br />')
}
