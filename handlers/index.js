'use strict'

const config = require('../config')
const jwt = require('jsonwebtoken')
const encryptor = require('simple-encryptor')(config.ENCRYPTOR_KEY)
const getSessionData = require('../lib/get-session-data')
const generateApplicantId = require('../lib/generate-applicant-id')
const filterDsfDelt = require('../lib/filter-dsf-delt')
const logger = require('../lib/logger')
const pkg = require('../package.json')

module.exports.getFrontpage = async (request, reply) => {
  const yar = request.yar
  const logoutUrl = config.AUTH_URL_LOGOUT
  const dsfError = yar.get('dsfError')
  const korError = yar.get('korError')
  const applicantId = yar.get('applicantId')
  let completedSteps = yar.get('completedSteps') || []
  completedSteps.push('')
  yar.set('completedSteps', completedSteps)

  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  if (dsfError || korError) {
    logger('error', ['index', 'getFrontpage', applicantId, dsfError, korError])
    request.cookieAuth.clear()
    reply.redirect('/ikkefunnet')
  } else {
    logger('info', ['index', 'getFrontpage', applicantId, 'success'])
    reply.view('index', viewOptions)
  }
}

// Login, get data from session
module.exports.start = async (request, reply) => {
  logger('info', ['index', 'start', 'start'])
  const yar = request.yar
  const receivedToken = request.query.jwt
  const jwtDecrypted = jwt.verify(receivedToken, config.JWT_SECRET)
  const jwtData = encryptor.decrypt(jwtDecrypted.data)

  const sessionUrl = `${config.SESSIONS_SERVICE}/storage/${jwtData.session}`
  const data = await getSessionData(sessionUrl)
  const applicantId = generateApplicantId(data.dsfData)
  const dsfDataDelt = filterDsfDelt(data.dsfData)

  const tokenOptions = {
    expiresIn: '1h',
    issuer: 'https://auth.t-fk.no'
  }

  const token = jwt.sign(data.dsfData, config.JWT_SECRET, tokenOptions)

  yar.reset()
  yar.set('dsfData', data.dsfData)
  yar.set('korData', data.korData)
  yar.set('applicantId', applicantId)
  yar.set('skjemaUtfyllingStart', new Date().getTime())
  if (dsfDataDelt !== false) {
    logger('info', ['index', 'start', applicantId, 'dsfDataDelt'])
    yar.set('dsfDataDelt', dsfDataDelt)
  }

  const dsfError = data.dsfError
  const korError = data.korError

  if (dsfError || korError) {
    if (dsfError && dsfError.CODE === '4') {
      logger('error', ['index', 'start', 'dsf', dsfError])
      reply.redirect('/failwhale')
    } else {
      logger('error', ['index', 'start', 'dsf', dsfError])
      reply.redirect('/ikkefunnet')
    }
  } else {
    logger('info', ['index', 'start', applicantId, 'success'])
    request.cookieAuth.set({
      token: token,
      isAuthenticated: true,
      data: data.dsfData
    })

    reply.redirect('/')
  }
}

module.exports.checkStart = async (request, reply) => {
  const yar = request.yar
  const dsfError = yar.get('dsfError')
  const korError = yar.get('korError')

  yar.set('introOk', true)

  if (dsfError || korError) {
    request.cookieAuth.clear()
    reply.redirect('/ikkefunnet')
  } else {
    reply.redirect('/confirm')
  }
}

module.exports.hjelp = async (request, reply) => {
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('hjelp', viewOptions)
}

module.exports.vilkar = async (request, reply) => {
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('vilkar', viewOptions)
}

module.exports.personvern = async (request, reply) => {
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('personvern', viewOptions)
}

module.exports.loggAv = async (request, reply) => {
  const yar = request.yar
  const applicantId = yar.get('applicantId')
  const logoutUrl = config.AUTH_URL_LOGOUT
  logger('info', ['index', 'loggAv', applicantId, 'signing out'])

  request.cookieAuth.clear()
  yar.reset()

  reply.redirect(logoutUrl)
}
