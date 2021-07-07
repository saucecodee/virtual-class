const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require("cors")
const path = require('path');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();

module.exports = (app) => {
  app.set('views', path.join(__dirname, './../../views'));
  app.set('view engine', 'ejs');
  app.use(session({
    secret: 'XXXX-XXXX-XXXX',
    store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 260 }),
    cookie: {expires: new Date(Date.now() + (30 * 86400 * 1000))},
    saveUninitialized: false,
    resave: false
  }));
  app.use(cors())
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
  app.use('/uploads', express.static("uploads"));

  return app
}