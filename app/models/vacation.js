'use strict';

var Mongo = require('mongodb');

function Vacation(o){
  this.name = o.name;
  this.start = new Date(o.start);
  this.end = new Date(o.end);
  this.lat = o.lat * 1;
  this.lng = o.lng * 1;
  this.photos = [];
}

Object.defineProperty(Vacation, 'collection', {
  get: function(){return global.mongodb.collection('vacations');}
});

Vacation.all = function(cb){
  Vacation.collection.find().toArray(cb);
};

module.exports = Vacation;

