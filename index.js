'use strict'

const routes = require('./routes')
const skjemaRoutes = require('./routes/skjema')
const testRoutes = require('./routes/test')

exports.register = (server, options, next) => {
  server.route(routes)
  server.route(skjemaRoutes)
  server.route(testRoutes)
  next()
}

exports.register.attributes = {
  pkg: require('./package.json')
}
