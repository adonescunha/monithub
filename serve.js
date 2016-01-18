var express = require('express');
var mongoose = require('mongoose')
var app = express();

mongoose.connect(process.env.DATABASE || 'mongodb://localhost/monithub');

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log('MonitHub app listening on port ' + port + '!');
});

exports = module.exports = app;
