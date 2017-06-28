'use strict'

const tap = require('tap')
const skjemaHandlers = require('../../handlers/skjema')

tap.equal(Object.keys(skjemaHandlers).length, 24, 'There are 24 skjema handlers')

tap.ok(skjemaHandlers.getNext, 'Handler has method getNext')

tap.ok(skjemaHandlers.getPreviousStep, 'Handler has method getPreviousStep')

tap.ok(skjemaHandlers.showSeOver, 'Handler has method showSeOver')

tap.ok(skjemaHandlers.showBosted, 'Handler has method showBosted')

tap.ok(skjemaHandlers.showBostedHybel, 'Handler has method showBostedHybel')

tap.ok(skjemaHandlers.showBostedDelt, 'Handler has method showBostedDelt')

tap.ok(skjemaHandlers.showGrunnlag, 'Handler has method showGrunnlag')

tap.ok(skjemaHandlers.showBusskort, 'Handler has method showBusskort')

tap.ok(skjemaHandlers.showBusskortNummer, 'Handler has method showBusskortNummer')

tap.ok(skjemaHandlers.showIkkeFunnet, 'Handler has method showIkkeFunnet')

tap.ok(skjemaHandlers.showFailWhale, 'Handler has method showFailWhale')

tap.ok(skjemaHandlers.showVelgSkole, 'Handler has method showVelgSkole')

tap.ok(skjemaHandlers.showVelgKlasse, 'Handler has method showVelgKlasse')

tap.ok(skjemaHandlers.showVelgStudieretning, 'Handler has method showVelgStudieretning')

tap.ok(skjemaHandlers.showSoktTidligere, 'Handler has method showSoktTidligere')

tap.ok(skjemaHandlers.showSoknadUendret, 'Handler has method showSoknadUendret')

tap.ok(skjemaHandlers.showKvittering, 'Handler has method showKvittering')

tap.ok(skjemaHandlers.showSkoleAdresse, 'Handler has method showSkoleAdresse')

tap.ok(skjemaHandlers.doSubmit, 'Handler has method doSubmit')

tap.ok(skjemaHandlers.showConfirm, 'Handler has method showConfirm')

tap.ok(skjemaHandlers.checkConfirm, 'Handler has method checkConfirm')

tap.ok(skjemaHandlers.showUriktigeOpplysninger, 'Handler has method showUriktigeOpplysninger')

tap.ok(skjemaHandlers.setupChanges, 'Handler has method setupChanges')

tap.ok(skjemaHandlers.showFeil, 'Handler has method showFeil')
