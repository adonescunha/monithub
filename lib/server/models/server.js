'use strict';

var mongoose = require('mongoose')
  , _ = require('lodash')
  , service = require('./service')
  , Service  = service.Service
  , ServiceSchema  = service.ServiceSchema;

var ServerSchema = mongoose.Schema({
    hostname:   {type: String, required: true, unique: true},
    port:       {type: Number, default: 2812},
    username:   {type: String},
    password:   {type: String},
    ssl:        {type: Boolean, default: false},
    status:     {type: Number, default: 1, enum: [1, 2, 3]},
    services_count: {type: Number, default: 0},
    uptime: {type: Number},
    poll: {type: Number},
    localhostname: {type: String},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date}
});

ServerSchema.methods.updateStatus = function() {
  var self = this;
  return Service.find({
    server: this
  })
    .then(function(services) {
      var status = 0;

      _.each(services, function(service) {
        var newStatus = service.status.status;

        if (newStatus > status) {
          status = service.status.status;
        }
      });

      self.status = status;
      return self.save();
    })
    .catch(function(err) {
      throw err;
    });
};

ServerSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

var Server = mongoose.model('servers', ServerSchema);

module.exports = {
  ServerSchema: ServerSchema,
  Server: Server
};
