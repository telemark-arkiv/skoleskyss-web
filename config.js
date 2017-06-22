'use strict'

module.exports = {
  SERVER_PORT_WEB: process.env.SERVER_PORT_WEB || 8000,
  CALLBACK_STATUS_URL: process.env.CALLBACK_STATUS_URL || 'https://api.buddy.com/status/',
  AUTH_URL_LOGIN: process.env.AUTH_URL_LOGIN || '/login',
  AUTH_URL_LOGOUT: process.env.AUTH_URL_LOGOUT || '/logout',
  JWT_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  ENCRYPTOR_KEY: process.env.ENCRYPTOR_KEY || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  YAR_SECRET: process.env.YAR_SECRET || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  LOGS_SERVICE: process.env.LOGS_SERVICE || 'https://logs.skoleskyss.com',
  SESSIONS_SERVICE: process.env.SESSIONS_SERVICE || 'https://sessions.service.io',
  SMS_SERVICE: process.env.SMS_SERVICE || 'https://sms.service.io',
  PAPERTRAIL_HOSTNAME: process.env.PAPERTRAIL_HOSTNAME || 'skoleskyss',
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT || 12345
}
