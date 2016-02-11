'use strict';

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
  size:          {type: Number},
  mode:          {type: Number},
  uid:           {type: Number},
  gid:           {type: Number},
  memory:        {
    percent:       {type: Number},
    percenttotal:  {type: Number},
    kilobyte:      {type: Number},
    kilobytetotal: {type: Number}
  },
  cpu:           {
    percent:      {type: Number},
    percenttotal: {type: Number}
  },
  port: {
    hostname: {type: String},
    portnumber: {type: Number},
    protocol: {type: String},
    type: {type: String},
    responsetime: {type: Number}
  },
  block: {
    percent: {type: Number},
    usage: {type: Number},
    total: {type: Number}
  },
  inode: {
    percent: {type: Number},
    usage: {type: Number},
    total: {type: Number}
  },
  system: {
    load: {
      avg01: {type: Number},
      avg05: {type: Number},
      avg15: {type: Number}
    },
    cpu: {
      user: {type: Number},
      system: {type: Number},
      wait: {type: Number}
    },
    memory: {
      percent: {type: Number},
      kilobyte: {type: Number}
    },
    swap: {
      percent: {type: Number},
      kilobyte: {type: Number}
    }
  }
});

var Status = mongoose.model('statuses', StatusSchema);

module.exports = {
  StatusSchema: StatusSchema,
  Status: Status
};
