'use strict';

var Vacation = require('../models/vacation'),
    _ = require('lodash'),
    moment = require('moment');

exports.init = function(req, res){
  res.render('vacations/init');
};

exports.create = function(req, res){
  var vacation = new Vacation(req.body);
  vacation.insert(function(){
    res.redirect('/vacations');
  });
};

exports.index = function(req, res){
  Vacation.all(function(err, vacations){
    res.render('vacations/index', {vacations:vacations, moment:moment});
  });
};

exports.show = function(req, res){
  Vacation.findById(req.params.id, function(vacation){
    res.render('vacations/show', {vacation:vacation, moment:moment, _:_});
  });
};
