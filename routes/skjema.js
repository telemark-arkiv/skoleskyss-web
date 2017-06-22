'use strict'

const Handlers = require('../handlers/skjema')

module.exports = [
  {
    method: 'GET',
    path: '/bosted',
    config: {
      handler: Handlers.showBosted,
      description: 'Show the bosted pages'
    }
  },
  {
    method: 'GET',
    path: '/bostedhybel',
    config: {
      handler: Handlers.showBostedHybel,
      description: 'Show the hybel page'
    }
  },
  {
    method: 'GET',
    path: '/bosteddelt',
    config: {
      handler: Handlers.showBostedDelt,
      description: 'Show the hybel page'
    }
  },
  {
    method: 'GET',
    path: '/grunnlag',
    config: {
      handler: Handlers.showGrunnlag,
      description: 'Show the personal info pages'
    }
  },
  {
    method: 'GET',
    path: '/velgskole',
    config: {
      handler: Handlers.showVelgSkole,
      description: 'Start here if logged in'
    }
  },
  {
    method: 'GET',
    path: '/skoleadresse',
    config: {
      handler: Handlers.showSkoleAdresse,
      description: 'Start here if logged in'
    }
  },
  {
    method: 'GET',
    path: '/velgklasse',
    config: {
      handler: Handlers.showVelgKlasse,
      description: 'Show velg klasse form'
    }
  },
  {
    method: 'GET',
    path: '/velgstudieretning',
    config: {
      handler: Handlers.showVelgStudieretning,
      description: 'Prepare for changes'
    }
  },
  {
    method: 'GET',
    path: '/ikkefunnet',
    config: {
      auth: false,
      handler: Handlers.showIkkeFunnet,
      description: 'Show the person not found page'
    }
  },
  {
    method: 'GET',
    path: '/failwhale',
    config: {
      auth: false,
      handler: Handlers.showFailWhale,
      description: 'Show the failWhale page'
    }
  },
  {
    method: 'GET',
    path: '/busskort',
    config: {
      handler: Handlers.showBusskort,
      description: 'Show travel card page'
    }
  },
  {
    method: 'GET',
    path: '/busskortnummer',
    config: {
      handler: Handlers.showBusskortNummer,
      description: 'Show travel card number page'
    }
  },
  {
    method: 'GET',
    path: '/seover',
    config: {
      handler: Handlers.showSeOver,
      description: 'Start here if manual'
    }
  },
  {
    method: 'GET',
    path: '/sokttidligere',
    config: {
      handler: Handlers.showSoktTidligere,
      description: 'Start here if manual'
    }
  },
  {
    method: 'GET',
    path: '/soknaduendret',
    config: {
      handler: Handlers.showSoknadUendret,
      description: 'Start here if manual'
    }
  },
  {
    method: 'GET',
    path: '/kvittering',
    config: {
      handler: Handlers.showKvittering,
      description: 'Vis kvittering'
    }
  },
  {
    method: 'GET',
    path: '/uriktigeopplysninger',
    config: {
      handler: Handlers.showUriktigeOpplysninger,
      description: 'Show page for uriktige opplysninger'
    }
  },
  {
    method: 'GET',
    path: '/confirm',
    config: {
      handler: Handlers.showConfirm,
      description: 'Start here if manual'
    }
  },
  {
    method: 'POST',
    path: '/confirm',
    config: {
      handler: Handlers.checkConfirm,
      description: 'Start here if manual'
    }
  },
  {
    method: 'POST',
    path: '/next',
    config: {
      handler: Handlers.getNext,
      description: 'Start here if manual'
    }
  },
  {
    method: 'GET',
    path: '/next',
    config: {
      handler: Handlers.getNext,
      description: 'Show next step'
    }
  },
  {
    method: 'GET',
    path: '/previous',
    config: {
      handler: Handlers.getPreviousStep,
      description: 'Show previous step'
    }
  },
  {
    method: 'POST',
    path: '/submit',
    config: {
      handler: Handlers.doSubmit,
      description: 'Submit the form'
    }
  },
  {
    method: 'GET',
    path: '/endre',
    config: {
      handler: Handlers.setupChanges,
      description: 'Prepare for changes'
    }
  }
]
