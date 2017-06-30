'use strict'

const jwt = require('jsonwebtoken')
const getWaypoints = require('tfk-saksbehandling-skoleskyss-waypoints')
const config = require('../config')
const pkg = require('../package.json')
const skoler = require('../lib/data/skoler.json')
const getSkoleFromId = require('../lib/get-skole-from-id')
const lookupSeeiendom = require('../lib/lookup-seeiendom')
const lookupDistance = require('../lib/lookup-distance')

module.exports.showTest = function showTest (request, reply) {
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('test', viewOptions)
}

module.exports.setupTest = function setupTest (request, reply) {
  const payload = request.payload
  const dsfData = {
    NAVN: payload.NAVN,
    'NAVN-S': payload['NAVN-S'],
    'NAVN-M': payload['NAVN-M'],
    'NAVN-F': payload['NAVN-F'],
    FODT: payload.FODT,
    PERS: payload.PERS,
    ADR: payload.ADR,
    POSTN: payload.POSTN,
    POSTS: payload.POSTS,
    GARD: payload.GARD,
    KOMNR: payload.KOMNR,
    BRUK: payload.BRUK
  }
  const korData = {
    uid: payload.FODT.toString() + payload.PERS.toString(),
    MobilePhone: payload.MobilePhone,
    Email: payload.Email,
    logoutUrl: config.AUTH_URL_LOGOUT
  }

  if (payload.resetSession) {
    console.log('Testsettings =======> session reset')
    request.yar.reset()
  }

  if (payload.dsfError) {
    console.log('Testsettings =======> applies dsfError')
    request.yar.set('dsfError', true)
  }

  if (payload.korError) {
    console.log('Testsettings =======> applies korError')
    request.yar.set('korError', true)
  }

  request.yar.set('tidligereSoknad', payload.personAlreadyApplied || false)

  request.yar.set('duplikatSoknad', payload.duplicateApplication || false)

  const tokenOptions = {
    expiresIn: '1h',
    issuer: 'https://auth.t-fk.no'
  }

  const data = {
    dsfData: dsfData,
    korData: korData
  }

  const token = jwt.sign(data, config.JWT_SECRET, tokenOptions)

  request.yar.set('dsfData', data.dsfData)
  request.yar.set('korData', data.korData)

  request.cookieAuth.set({
    token: token,
    isAuthenticated: true,
    data: data
  })

  reply.redirect('/')
}

module.exports.showAvstand = function showAvstand (request, reply) {
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl,
    skoler: skoler
  }

  reply.view('avstand', viewOptions)
}

module.exports.calculateAvstand = async (request, reply) => {
  const payload = request.payload
  const skoleData = getSkoleFromId(payload.skole)
  let address = payload.ADR
  let waypoints = false
  if (payload.POSTN && payload.POSTS) {
    address = payload.ADR + ', ' + payload.POSTN + ' ' + payload.POSTS
    waypoints = getWaypoints(payload)
  }
  const skoleKoord = skoleData.geocoded.lat + ',' + skoleData.geocoded.lon
  const seeData = await lookupSeeiendom(address)
  const addressKoord = seeData.geocoded.lat + ',' + seeData.geocoded.lon

  let check = {
    origin: addressKoord,
    destination: skoleKoord
  }

  if (waypoints !== false) {
    check.waypoints = waypoints
  }

  const distance = lookupDistance(check)

  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl,
    distance: distance,
    skoleData: skoleData,
    address: address
  }
  reply.view('avstand-beregnet', viewOptions)
}
