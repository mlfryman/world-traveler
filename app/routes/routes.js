'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    home           = require('../controllers/home'),
    vacations      = require('../controllers/vacations');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);
  app.get('/about', home.about);
  app.get('/faq', home.faq);
  app.get('/contact', home.contact);

  app.get('/vacations/new', vacations.init);
  app.post('/vacations', vacations.create);
  app.get('/vacations', vacations.index);
  app.get('/vacations/:id', vacations.show);

  console.log('Routes Loaded');
};

