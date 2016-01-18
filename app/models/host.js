var mongoose = require('mongoose')


var hostSchema = mongoose.Schema({
    domain: { type: String, required: true, unique: true},
    port: { type: Number, required: true },
    username: String,
    password: String,
    created_at: Date,
    updated_at: Date
});

var Host = mongoose.model('Host', hostSchema);

module.exports = Host;
