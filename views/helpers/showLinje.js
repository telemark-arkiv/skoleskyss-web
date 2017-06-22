'use strict'

module.exports = function (item) {
  if (item.velgstudieretning && item.velgstudieretning.grunnlag !== 'Annen linje') {
    return '- ' + item.velgstudieretning.grunnlag
  }
}
