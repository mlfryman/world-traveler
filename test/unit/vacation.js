/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Vacation  = require('../../app/models/vacation'),
    Mongo = require('mongodb'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'wt';

describe('Vacation', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Vacation object', function(){
      var v = new Vacation({name: 'Reykjavíc, Iceland', start:'07/18/2013', end:'08/02/2013', coordinates:{lat:'64.133333', lng:'-21.933333'}});
      expect(v).to.be.instanceof(Vacation);
      expect(v.start).to.be.instanceof(Date);
      expect(v.end).to.be.instanceof(Date);
      expect(v.name).to.equal('Reykjavíc, Iceland');
      expect(v.coordinates.lat).to.be.closeTo(64.133333, 0.01);
      expect(v.coordinates.lng).to.be.closeTo(-21.933333, 0.01);
    });
  });

  describe('.create', function(){
    it('should create a vacation', function(done){
      var v = new Vacation({name: 'Reykjavíc, Iceland', coordinates:{lat:'64.133333', lng:'-21.933333'}});
      Vacation.create(v, function(err, vacation){
        expect(vacation._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.all', function(){
    it('should get all vacations', function(done){
      Vacation.all(function(err, vacations){
        expect(vacations).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a person by its id', function(done){
      Vacation.findById(Mongo.ObjectID('100000000000000000000003'), function(err, vacation){
        expect(vacation.name).to.equal('Amsterdam, Netherlands');
        expect(vacation).to.be.instanceof(Vacation);
        done();
      });
    });
  });
  // Last Bracket
});

