'use strict'

const pkg = require('../package.json')
const logger = require('../lib/logger')

module.exports.ping = (request, reply) => {
  logger('info', ['ping', 'success'])
  const result = {
    name: pkg.name,
    version: pkg.version,
    uptime: process.uptime()
  }
  reply(result)
}
