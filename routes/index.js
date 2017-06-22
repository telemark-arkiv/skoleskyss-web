'use strict'

const Handlers = require('../handlers')

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: Handlers.getFrontpage,
      description: 'Show the frontpage'
    }
  },
  {
    method: 'GET',
    path: '/start',
    config: {
      handler: Handlers.start,
      description: 'Start here if logged in',
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/start',
    config: {
      handler: Handlers.checkStart,
      description: 'Start here if logged in'
    }
  },
  {
    method: 'GET',
    path: '/hjelp',
    config: {
      handler: Handlers.hjelp,
      description: 'Show the help page',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/vilkar',
    config: {
      handler: Handlers.vilkar,
      description: 'Show the vilkar page',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/personvern',
    config: {
      handler: Handlers.personvern,
      description: 'Show the personvern page',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/loggav',
    config: {
      handler: Handlers.loggAv,
      description: 'Log out'
    }
  }
]
