'use strict'

const Handlers = require('../handlers/test')

module.exports = [
  {
    method: 'GET',
    path: '/test',
    config: {
      handler: Handlers.showTest,
      description: 'Show the testpage',
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/test',
    config: {
      handler: Handlers.setupTest,
      description: 'Setup test environment',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/avstand',
    config: {
      handler: Handlers.showAvstand,
      description: 'Show the avstandspage',
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/avstand',
    config: {
      handler: Handlers.calculateAvstand,
      description: 'Calculate distance',
      auth: false
    }
  }
]
