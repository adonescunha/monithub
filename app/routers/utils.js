'use strict';

var Server = require('../models/server').Server
  , errors = require('../errors')
  , DoesNotExistError = errors.DoesNotExistError
  , SERVER_DOES_NOT_EXIST_MESSAGE = errors.SERVER_DOES_NOT_EXIST_MESSAGE;

var findServerOr404 = function(req, res, options) {
  return Server.findOne(options)
    .then(function(server) {
      if (server === null) {
        res.status(404).json({
          message: SERVER_DOES_NOT_EXIST_MESSAGE
        });

        throw new DoesNotExistError(req, res, SERVER_DOES_NOT_EXIST_MESSAGE);
      }

      req.params.server = server;
      return res;
    })
    .catch(function(err) {
      throw err;
    });
};

module.exports = {
  findServerOr404: findServerOr404
};
