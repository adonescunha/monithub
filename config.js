var db = process.env.DATABASE || 'mongodb://localhost/monithub';

if (process.env.NODE_ENV == 'test') {
  db += '_test';
}

module.exports = {
  db: db
};
