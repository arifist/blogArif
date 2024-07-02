const session = require('express-session')
const configSession=session({
    secret: '0274aa0f-76e5-4095-8947-38b206597703',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:1000*60*60*1 } //mili saniye
  });

  module.exports = configSession;