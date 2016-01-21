'use strict'

var mongoose     = require('mongoose');
var StatusSchema = require('./status').StatusSchema;

var ServiceSchema = mongoose.Schema({
  server:   {type: mongoose.Schema.ObjectId, ref: 'servers'},
  name:     {type: String, required: True},
  type:     {type: Number, required: True},
  statuses: [StatusSchema]
});

var Service = mongoose.model('services', ServiceSchema);

module.exports = {
  ServiceSchema: ServiceSchema,
  Service: Service
};
