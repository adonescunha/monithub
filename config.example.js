'use strict';

var config = {
  production: {
    db: 'mongodb://localhost/monithub',
    port: 8080,
  },
  development: {
    db: 'mongodb://localhost/monithub',
    port: 8080,
  },
  test: {
    db: 'mongodb://localhost/monithub_test',
    port: 8081,
  }
};

module.exports = config;
