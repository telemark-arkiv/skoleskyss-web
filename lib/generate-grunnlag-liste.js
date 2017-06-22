'use strict'

module.exports = function generateGrunnlagListe (data) {
  var liste = []
  const validPostnummerFerry = [
    '3950',
    '3770',
    '3780',
    '3781',
    '3783',
    '3788'
  ]
  const grunnlagAvstand = {
    id: 'grunnlag00',
    name: 'Avstanden til skolen er over 6 kilometer',
    value: 'Avstand'
  }
  const grunnlagBatFerge = {
    id: 'grunnlag10',
    name: 'Jeg må ta båt eller ferge for å komme til skolen',
    value: 'Båt/Ferge'
  }
  const grunnlagAnnet = {
    id: 'grunnlag20',
    name: 'Andre årsaker',
    value: 'Annet'
  }

  liste.push(grunnlagAvstand)

  if (data.bosted.bosted === 'folkeregistrert' && validPostnummerFerry.indexOf(data.dsfData.POSTN.toString()) > -1) {
    liste.push(grunnlagBatFerge)
  }

  if (data.bosted.bosted === 'delt') {
    if (validPostnummerFerry.indexOf(data.dsfData.POSTN.toString()) > -1 || validPostnummerFerry.indexOf(data.bosteddelt.POSTN.toString()) > -1) {
      liste.push(grunnlagBatFerge)
    }
  }

  if (data.bosted.bosted === 'hybel' && validPostnummerFerry.indexOf(data.bostedhybel.POSTN.toString()) > -1) {
    liste.push(grunnlagBatFerge)
  }

  liste.push(grunnlagAnnet)

  return liste
}
