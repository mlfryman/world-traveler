'use strict';

exports.init = function(req, res){
  res.render('vacations/init');
};

exports.create = function(req, res){
  console.log(req.body);
  res.redirect('/vacations');
};
