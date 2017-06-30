'use strict'

const Hapi = require('hapi')
const hapiAuthCookie = require('hapi-auth-cookie')
const server = new Hapi.Server()
const config = require('./config')
const skoleskyssService = require('./index')
const validate = require('./lib/validate-jwt')
const logger = require('./lib/logger')
const goodOptions = {
  ops: {
    interval: 900000
  },
  reporters: {
    console: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ log: '*', ops: '*', error: '*' }]
    }, {
      module: 'good-console'
    }, 'stdout']
  }
}
const yarOptions = {
  storeBlank: false,
  cookieOptions: {
    password: config.YAR_SECRET,
    isSecure: process.env.NODE_ENV !== 'development',
    isSameSite: 'Lax'
  }
}

const plugins = [
  { register: hapiAuthCookie },
  { register: require('vision') },
  { register: require('inert') },
  { register: require('yar'), options: yarOptions },
  { register: require('good'), options: goodOptions }
]

function endIfError (error) {
  if (error) {
    logger('error', ['server', error])
    process.exit(1)
  }
}

server.connection({
  port: config.SERVER_PORT_WEB
})

server.register(plugins, error => {
  endIfError(error)

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views',
    helpersPath: 'views/helpers',
    partialsPath: 'views/partials',
    layoutPath: 'views/layouts',
    layout: true,
    compileMode: 'sync'
  })

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    },
    config: {
      auth: false
    }
  })

  server.auth.strategy('session', 'cookie', {
    password: config.COOKIE_SECRET,
    cookie: 'skoleskyss-session',
    validateFunc: validate,
    redirectTo: config.AUTH_URL_LOGIN,
    isSecure: process.env.NODE_ENV !== 'development',
    isSameSite: 'Lax'
  })

  server.auth.default('session')

  registerRoutes()
})

function registerRoutes () {
  server.register([
    {
      register: skoleskyssService,
      options: {}
    }
  ], function (err) {
    if (err) {
      logger('error', ['server', 'registerRoutes', err])
    }
  })
}

module.exports.start = () => {
  server.start(() => {
    logger('info', ['server', 'start', 'server running at', server.info.uri])
  })
}

module.exports.stop = () => {
  server.stop(() => {
    logger('info', ['server', 'stop', 'server stopped'])
  })
}
