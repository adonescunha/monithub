'use strict';

var mongoose     = require('mongoose')
  , StatusSchema = require('./status').StatusSchema
  , Server = require('./server').Server;

var ServiceSchema = mongoose.Schema({
  server:   {type: mongoose.Schema.ObjectId, ref: 'servers'},
  name:     {type: String, required: true},
  type:     {type: Number, required: true},
  status: StatusSchema
});

ServiceSchema.methods.incrementServerServicesCount = function(increment) {
  return mongoose.model('servers')
    .findByIdAndUpdate(this.server._id, {$inc: {services_count: increment}});
};

ServiceSchema.post('save', function(service) {
  service.incrementServerServicesCount(1);
});

ServiceSchema.post('remove', function(service) {
  service.incrementServerServicesCount(-1);
});

var Service = mongoose.model('services', ServiceSchema);

module.exports = {
  ServiceSchema: ServiceSchema,
  Service: Service
};
