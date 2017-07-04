'use strict'

const Handlers = require('../handlers/ping')

module.exports = [
  {
    method: 'GET',
    path: '/ping',
    config: {
      handler: Handlers.ping,
      description: 'Ping page',
      auth: false
    }
  }
]
