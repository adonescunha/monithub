'use strict';

var Server = require('../models/server').Server
  , Service = require('../models/service').Service
  , errors = require('../errors')
  , DoesNotExistError = errors.DoesNotExistError
  , SERVER_DOES_NOT_EXIST_MESSAGE = errors.SERVER_DOES_NOT_EXIST_MESSAGE
  , SERVICE_DOES_NOT_EXIST_MESSAGE = errors.SERVICE_DOES_NOT_EXIST_MESSAGE;

var findOr404 = function(req, res, options, findOptions) {
  return options.model.findOne(findOptions)
    .then(function(instance) {
      if (instance === null) {
        res.status(404).json({
          message: options.errorMessage
        });

        throw new DoesNotExistError(req, res, options.errorMessage);
      }

      req.params[options.name] = instance;
      return res;
    })
    .catch(function(err) {
      throw err;
    });
};

var findServerOr404 = function(req, res, options) {
  return findOr404(req, res, {
    model: Server,
    errorMessage: SERVER_DOES_NOT_EXIST_MESSAGE,
    name: 'server'
  }, options);
};

var findServiceOr404 = function(req, res, options) {
  return findOr404(req, res, {
    model: Service,
    errorMessage: SERVICE_DOES_NOT_EXIST_MESSAGE,
    name: 'service'
  }, options);
};

module.exports = {
  findServerOr404: findServerOr404,
  findServiceOr404: findServiceOr404
};
