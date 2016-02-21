var db = process.env.DATABASE || 'mongodb://localhost/monithub';

if (process.env.NODE_ENV == 'test') {
  db += '_test';
}

module.exports = {
  db: db,
  port: process.env.PORT || 8080,
  kuePort: process.env.KUE_PORT || 8081
};
