'use strict';

var Mongo = require('mongodb'),
    _ = require('lodash');

function Vacation(o){
  this.name = o.name;
  this.start = new Date(o.start);
  this.end = new Date(o.end);
  this.coordinates = {lat:parseFloat(o.coordinates.lat), lng:parseFloat(o.coordinates.lng)};
  this.photos = [];
}

Object.defineProperty(Vacation, 'collection', {
  get: function(){return global.mongodb.collection('vacations');}
});

Vacation.all = function(cb){
  Vacation.collection.find().toArray(cb);
};

Vacation.create = function(o, cb){
  var v = new Vacation(o);
  Vacation.collection.save(v, cb);
};

Vacation.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Vacation.collection.findOne({_id:_id}, function(err, obj){
    var vacation = changePrototype(obj);
    cb(vacation);
  });
};

module.exports = Vacation;

// PRIVATE FUNCTIONS //

function changePrototype(o){
  return _.create(Vacation.prototype, o);
}
