'use strict'

var mongoose     = require('mongoose');

var StatusSchema = mongoose.Schema({
  collectedsec:  {type: Number},
  collectedusec: {type: Number},
  status:        {type: Number},
  statushint:    {type: Number},
  monitor:       {type: Number},
  monitormode:   {type: Number},
  pid:           {type: Number},
  ppid:          {type: Number},
  uptime:        {type: Number},
  children:      {type: Number},
  memory:        {
    percent:       {type: Number},
    percenttotal:  {type: Number},
    kilobyte:      {type: Number},
    kilobytetotal: {type: Number}
  },
  cpu:           {
    percent:      {type: Number},
    percenttotal: {type: Number}
  }
});

var Service = mongoose.model('services', ServiceSchema);

module.exports = {
  ServiceSchema: ServiceSchema,
  Service: Service
};
