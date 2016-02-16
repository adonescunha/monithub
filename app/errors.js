'use strict';

var inherits = require('util').inherits
  , SERVER_DOES_NOT_EXIST_MESSAGE = 'Server does not exist.'
  , SERVICE_DOES_NOT_EXIST_MESSAGE = 'Service does not exist';

var DoesNotExistError = function(req, res, message) {
  this.request = req;
  this.response = res;
  Error.call(this, message);
};

inherits(DoesNotExistError, Error);

module.exports = {
  DoesNotExistError: DoesNotExistError,
  SERVER_DOES_NOT_EXIST_MESSAGE: SERVER_DOES_NOT_EXIST_MESSAGE,
  SERVICE_DOES_NOT_EXIST_MESSAGE: SERVICE_DOES_NOT_EXIST_MESSAGE
};
