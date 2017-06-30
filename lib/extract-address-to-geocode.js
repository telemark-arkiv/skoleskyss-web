'use strict'

module.exports = dsf => {
  let address = ''

  if (dsf.GARD) {
    address = `${dsf.KOMNR}-${parseInt(dsf.GARD, 10)}/${parseInt(dsf.BRUK, 10)}`
  } else {
    address = `${dsf.ADR}, ${dsf.POSTN} ${dsf.POSTS}`
  }

  return address
}
