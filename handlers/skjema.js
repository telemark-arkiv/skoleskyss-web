'use strict'

const getWaypoints = require('tfk-saksbehandling-skoleskyss-waypoints')
const config = require('../config')
const getNextForm = require('../lib/get-next-form')
const getSkipSteps = require('../lib/get-skip-steps')
const extractAdressToGeocode = require('../lib/extract-address-to-geocode')
const unwrapGeocoded = require('../lib/unwrap-geocoded')
const getSkoleFromId = require('../lib/get-skole-from-id')
const generateGrunnlagListe = require('../lib/generate-grunnlag-liste')
const generateLinjeListe = require('../lib/generate-studieretning-liste')
const prepareDataForSubmit = require('../lib/prepare-data-for-submit')
const prepareDuplicateData = require('../lib/prepare-data-for-duplicates')
const logger = require('../lib/logger')
const pkg = require('../package.json')

module.exports.getNext = async (request, reply) => {
  const payload = request.payload
  const yar = request.yar
  const applicantId = yar.get('applicantId')
  if (payload) {
    logger('info', ['skjema', 'getNext', applicantId, 'payload'])
    let completedSteps = yar.get('completedSteps') || []
    completedSteps.push(payload.stepName)
    yar.set(payload.stepName, payload)
    yar.set('completedSteps', completedSteps)
    const skipSteps = getSkipSteps(yar._store)
    skipSteps.forEach(function (item) {
      yar.set(item, false)
    })
  }

  const nextForm = getNextForm(yar._store)
  logger('info', ['skjema', 'getNext', applicantId, 'nextForm', nextForm])
  if (payload && payload.stepName === 'grunnlag') {
    prepareDataForSubmit(request, async (error, document) => {
      if (error) {
        reply(error)
      } else {
        const dsfData = yar.get('dsfData')
        const fodselsNummer = dsfData.FODT.toString() + dsfData.PERS.toString()
        const duplicateData = prepareDuplicateData(document)
        // Is this a duplicate
        request.seneca.act({role: 'duplicate', cmd: 'check', duplicateId: fodselsNummer, duplicateData: duplicateData}, function checkDuplicated (error, data) {
          if (error) {
            reply(error)
          } else {
            if (data.duplicate || yar.get('duplikatSoknad')) {
              request.yar.set('duplikatSoknad', true)
              reply.redirect('/soknaduendret')
            } else {
              request.yar.set('duplikatSoknad', false)
              reply.redirect('/' + nextForm)
            }
          }
        })
      }
    })
  } else {
    reply.redirect('/' + nextForm)
  }
}

module.exports.getPreviousStep = (request, reply) => {
  const yar = request.yar
  let completedSteps = yar.get('completedSteps')
  if (completedSteps) {
    const previousStep = completedSteps.pop()
    yar.set('completedSteps', completedSteps)

    if (previousStep === 'skole') {
      yar.clear('velgskole')
      yar.clear('velgklasse')
      yar.clear('skoleadresse')
    }

    if (previousStep === 'grunnlag') {
      yar.clear('grunnlag')
    }

    if (previousStep === 'bosted') {
      yar.clear('bosted')
      yar.clear('bosteddelt')
      yar.clear('bostedhybel')
    }

    if (previousStep === 'busskort') {
      yar.clear('busskort')
      yar.clear('busskortnummer')
    }

    reply.redirect('/' + previousStep)
  } else {
    reply.redirect('/')
  }
}

module.exports.showSeOver = async (request, reply) => {
  const logoutUrl = config.AUTH_URL_LOGOUT
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  prepareDataForSubmit(request, async (error, document) => {
    if (error) {
      console.error(error)
    } else {
      viewOptions.document = document
    }
    reply.view('seover', viewOptions)
  })
}

module.exports.showBosted = async (request, reply) => {
  const yar = request.yar
  const sessionId = request.yar.id
  const dsfData = yar.get('dsfData')
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl,
    dsfData: dsfData
  }
  // Lookup address
  request.seneca.act({
    role: 'lookup',
    cmd: 'seeiendom',
    sessionId: sessionId,
    key: 'see-dsf',
    address: extractAdressToGeocode(dsfData)
  })

  reply.view('bosted', viewOptions)
}

module.exports.showBostedHybel = async (request, reply) => {
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('bostedhybel', viewOptions)
}

module.exports.showBostedDelt = async (request, reply) => {
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('bosteddelt', viewOptions)
}

module.exports.showGrunnlag = async (request, reply) => {
  const yar = request.yar
  const logoutUrl = config.AUTH_URL_LOGOUT
  const grunnlagListe = generateGrunnlagListe(yar._store)
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    grunnlagListe: grunnlagListe,
    logoutUrl: logoutUrl
  }

  reply.view('grunnlag', viewOptions)
}

module.exports.showBusskort = async (request, reply) => {
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('busskort', viewOptions)
}

module.exports.showBusskortNummer = async (request, reply) => {
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('busskortnummer', viewOptions)
}

module.exports.showIkkeFunnet = async (request, reply) => {
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('ikkefunnet', viewOptions)
}

module.exports.showFailWhale = async (request, reply) => {
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('failwhale', viewOptions)
}

module.exports.showVelgSkole = async (request, reply) => {
  const yar = request.yar
  const logoutUrl = config.AUTH_URL_LOGOUT
  const sessionId = request.yar.id
  const hybel = yar.get('bostedhybel')
  const delt = yar.get('bosteddelt')
  const skoler = require('../lib/data/skoler.json')
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl,
    skoler: skoler
  }

  if (hybel || delt) {
    const key = hybel ? 'see-hybel' : 'see-delt'
    const data = hybel || delt
    const address = extractAdressToGeocode(data)
    // lookup address
    request.seneca.act({
      role: 'lookup',
      cmd: 'seeiendom',
      sessionId: sessionId,
      key: key,
      address: address
    })
  }

  reply.view('velgskole', viewOptions)
}

module.exports.showSkoleAdresse = async (request, reply) => {
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('skoleadresse', viewOptions)
}

module.exports.showVelgKlasse = async (request, reply) => {
  const yar = request.yar
  const logoutUrl = config.AUTH_URL_LOGOUT
  const sessionId = request.yar.id
  const valgtskole = yar.get('velgskole')
  const hybel = yar.get('bostedhybel')
  const delt = yar.get('bosteddelt')
  const dsf = yar.get('dsfData')

  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  if (valgtskole.skole !== '0000') {
    const skole = getSkoleFromId(valgtskole.skole)
    const destination = unwrapGeocoded(skole)
    // Calculating walking distance to selected school
    request.seneca.act({role: 'session', cmd: 'get', sessionId: sessionId}, function (error, data) {
      if (error) {
        console.error(error)
      } else {
        data.forEach(function (item) {
          if (/^see/.test(item.key)) {
            var lookup = {
              role: 'lookup',
              cmd: 'distance',
              key: 'distance-' + item.key,
              sessionId: sessionId,
              origin: unwrapGeocoded(item.data),
              destination: destination
            }
            var wp = {}

            if (item.key === 'see-dsf') {
              wp = dsf
            }

            if (item.key === 'see-delt') {
              wp = delt
            }

            if (item.key === 'see-hybel') {
              wp = hybel
            }

            wp.skole = valgtskole.skole
            const waypoints = getWaypoints(wp)

            if (waypoints.length > 0) {
              lookup.waypoints = waypoints
            }

            request.seneca.act(lookup)
          }
        })
      }

      reply.view('velgklasse', viewOptions)
    })
  } else {
    reply.view('velgklasse', viewOptions)
  }
}

module.exports.showVelgStudieretning = async (request, reply) => {
  const yar = request.yar
  const logoutUrl = config.AUTH_URL_LOGOUT
  const valgtskole = yar.get('velgskole')
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl,
    linjeListe: generateLinjeListe(valgtskole.skole)
  }

  reply.view('velgstudieretning', viewOptions)
}

module.exports.showSoktTidligere = async (request, reply) => {
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('sokttidligere', viewOptions)
}

module.exports.showSoknadUendret = async (request, reply) => {
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  reply.view('soknaduendret', viewOptions)
}

module.exports.showKvittering = async (request, reply) => {
  const yar = request.yar
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl,
    document: yar.get('submittedData')
  }

  yar.reset()
  // request.cookieAuth.clear()
  reply.view('kvittering', viewOptions)
}

module.exports.doSubmit = async (request, reply) => {
  const yar = request.yar
  const sessionId = yar.id
  const dsfData = yar.get('dsfData')
  const korData = yar.get('korData')
  const fodselsNummer = dsfData.FODT.toString() + dsfData.PERS.toString()

  prepareDataForSubmit(request, function (error, document) {
    if (error) {
      console.error(error)
    } else {
      yar.set('submittedData', document)
      const duplicateData = prepareDuplicateData(document)
      // Saves document, posts stats, saves duplicate data, updates queue counter, clears session
      request.seneca.act({role: 'queue', cmd: 'add', data: document})
      request.seneca.act({role: 'counter', cmd: 'add', key: 'skoleskyss/queue'})
      request.seneca.act({role: 'info', info: 'skoleskyss', data: document})
      request.seneca.act({role: 'duplicate', cmd: 'set', duplicateId: fodselsNummer, data: duplicateData})
      request.seneca.act({role: 'session', cmd: 'clear', sessionId: sessionId})
      // Send sms if mobile phone
      if (korData.MobilePhone !== '') {
        request.seneca.act({role: 'message', cmd: 'sms', phone: korData.MobilePhone})
      }
      reply.redirect('/kvittering')
    }
  })
}

module.exports.showUriktigeOpplysninger = async (request, reply) => {
  const yar = request.yar
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl
  }

  yar.reset()
  request.cookieAuth.clear()

  reply.view('uriktigeopplysninger', viewOptions)
}

module.exports.showConfirm = async (request, reply) => {
  const yar = request.yar
  const korData = yar.get('korData')
  const logoutUrl = config.AUTH_URL_LOGOUT
  const viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.systemName,
    githubUrl: pkg.repository.url,
    logoutUrl: logoutUrl,
    dsfData: yar.get('dsfData'),
    korData: korData
  }

  reply.view('confirm', viewOptions)
}

module.exports.checkConfirm = async (request, reply) => {
  const yar = request.yar
  const dsfData = yar.get('dsfData')
  const payload = request.payload
  const fodselsNummer = dsfData.FODT.toString() + dsfData.PERS.toString()

  if (payload.confirmed === 'ja') {
    var completedSteps = yar.get('completedSteps') || []
    completedSteps.push('confirm')
    yar.set('completedSteps', completedSteps)
    // Is this the first application?
    request.seneca.act({role: 'duplicate', cmd: 'check', duplicateId: fodselsNummer}, function checkDuplicated (error, data) {
      if (error) {
        reply(error)
      } else {
        if (data.duplicate || yar.get('tidligereSoknad')) {
          request.yar.set('tidligereSoknad', true)
          reply.redirect('/sokttidligere')
        } else {
          reply.redirect('/next')
        }
      }
    })
  } else {
    reply.redirect('/uriktigeopplysninger')
  }
}

module.exports.setupChanges = async (request, reply) => {
  const yar = request.yar
  const type = request.query.type

  if (type === 'skole') {
    yar.clear('velgskole')
    yar.clear('velgklasse')
    yar.clear('skoleadresse')
  }

  if (type === 'grunnlag') {
    yar.clear('grunnlag')
  }

  if (type === 'bosted') {
    yar.clear('bosted')
    yar.clear('bosteddelt')
    yar.clear('bostedhybel')
  }

  if (type === 'busskort') {
    yar.clear('busskort')
    yar.clear('busskortnummer')
  }

  reply.redirect('/next')
}
