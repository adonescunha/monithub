var mongoose = require('mongoose');

var ServerSchema = mongoose.Schema({
    hostname:   {type: String, required: true, unique: true},
    port:       {type: Number, default: 2812},
    username:   {type: String},
    password:   {type: String},
    ssl:        {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date}
});

var Server = mongoose.model('servers', ServerSchema);

module.exports = {
  ServerSchema: ServerSchema,
  Server: Server
};
