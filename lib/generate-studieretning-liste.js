'use strict'

module.exports = function getStudieRetningListe (skoleId) {
  var liste = []

  const grunnlagTeknisk = {
    id: 'linje00',
    name: 'Teknisk allmennfaglig utdanning (4 år)',
    value: 'Teknisk allmennfaglig utdanning (4 år)'
  }
  const linjeDansDrama = {
    id: 'linje10',
    name: 'Musikk, dans og drama',
    value: 'Musikk, dans og drama'
  }
  const linjeAnnen = {
    id: 'linje20',
    name: 'Annen linje',
    value: 'Annen linje'
  }

  if (skoleId === '39182') {
    liste.push(grunnlagTeknisk)
  }

  if (skoleId === '3724') {
    liste.push(linjeDansDrama)
  }

  liste.push(linjeAnnen)

  return liste
}
