/* jshint node: true */
'use strict';

var kue = require('kue')
  , queue = kue.createQueue();

module.exports = function(io) {
  queue.process('wait', function(job, done) {
    setTimeout(function() {
      console.log('WAIT FINISHED');
      io.sockets.emit('finished', {message: 'OK'});
      done();
    }, 3000);
  });
};
