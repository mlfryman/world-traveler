/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Vacation  = require('../../app/models/vacation'),
    Mongo = require('mongodb'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'wt-test';

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
      Vacation.findById(Mongo.ObjectID('100000000000000000000003'), function(vacation){
        expect(vacation.name).to.equal('Amsterdam, Netherlands');
        expect(vacation).to.be.instanceof(Vacation);
        done();
      });
    });
  });

  describe('.deleteById', function(){
    it('should delete vacation by its id', function(done){
      Vacation.deleteById(Mongo.ObjectID('100000000000000000000001'), function(vacation){
        Vacation.all(function(err, vacations){
          expect(vacations).to.have.length(2);
          done();
        });
      });
    });
  });

  describe('#save', function(){
    it('should update an exiting vacation in the database', function(done){
      Vacation.findById('100000000000000000000003', function(vacation){
        vacation.name = 'awesome!';
        vacation.photos = [];
        vacation.save(function(){
          expect(vacation.name).to.equal('awesome!');
          expect(vacation.photos).to.have.length(0);
          done();
        });
      });
    });
  });

  describe('#addPhoto', function(){
    it('should take less than 10000ms', function(done){
      this.timeout(10000);
      setTimeout(done, 9000);
    });
    it('should add a photo to a vacation', function(done){
      Vacation.findById('100000000000000000000003', function(vacation){
        vacation.addPhoto('amsterdam.jpg', function(){
          expect(vacation.photos).to.have.length(1);
          expect(vacation.photos[0]).to.equal('amsterdam.jpg');
          done();
        });
      });
    });
  });
  // Last Bracket
});

