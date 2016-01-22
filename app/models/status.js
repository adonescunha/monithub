'use strict'

var mongoose     = require('mongoose');

var StatusSchema = mongoose.Schema({
  collected_sec:  {type: Number},
  collected_usec: {type: Number},
  status:        {type: Number},
  status_hint:    {type: Number},
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

var Status = mongoose.model('statuses', StatusSchema);

module.exports = {
  StatusSchema: StatusSchema,
  Status: Status
};
