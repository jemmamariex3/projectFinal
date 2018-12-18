var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Room = require('../models/Room.js')
var passport = require('passport');
require('../config/passport')(passport)

/* GET ALL ROOMS */
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Room.find(function (err, books) {
      if (err) return next(err);
      res.json(books);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* GET SINGLE ROOM BY ID */
router.get('/:id', function (req, res, next) {
  Room.findById(req.params.id, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* SAVE ROOM */
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Room.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* UPDATE ROOM */
router.put('/:id', function (req, res, next) {
  Room.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* DELETE ROOM */
router.delete('/:id', function (req, res, next) {
  Room.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router
