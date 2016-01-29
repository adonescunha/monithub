var config = require('./config')
  , express = require('express')
  , mongoose = require('mongoose')
  , bodyParser = require('body-parser')
  , app = express();

mongoose.Promise = require('bluebird').Promise;
mongoose.connect(config.db);

var port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/servers', require('./app/routers/servers'));

app.listen(port, function () {
  console.log('MonitHub app listening on port ' + port + '!');
});

exports = module.exports = app;
