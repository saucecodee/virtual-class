const express = require('express');
const morgan = require('morgan');
const cors = require("cors")
const path = require('path');

module.exports = (app) => {
  app.set('views', path.join(__dirname, './../../views'));
  app.set('view engine', 'ejs');
  app.use(cors())
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
  app.use('/uploads', express.static("uploads"));

  return app
}