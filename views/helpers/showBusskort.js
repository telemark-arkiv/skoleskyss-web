'use strict'

module.exports = function showBusskort (data) {
  var outputs = []

  if (data.busskort.mottattBusskort === 'ja') {
    outputs.push('Jeg har mottatt busskort tidligere')
  }
  if (data.busskort.mottattBusskort === 'nei') {
    outputs.push('Jeg har ikke mottatt busskort tidligere')
  }

  if (data.busskort.mottattBusskort === 'mistet') {
    outputs.push('Jeg har mistet busskortet mitt')
  }

  if (data.busskortnummer) {
    outputs.push('Busskortnummer: ' + data.busskortnummer.busskortNummer)
  }

  return outputs.join('<br />')
}
