var mongoose = require('mongoose');

var ServerSchema = mongoose.Schema({
    hostname:   {type: String, required: true, unique: true},
    port:       {type: Number, required: true},
    username:   {type: String},
    password:   {type: String},
    ssl:        {type: Boolean},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date}
});

var Host = mongoose.model('servers', ServerSchema);

module.exports = Server;
