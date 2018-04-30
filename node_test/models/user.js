'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    role: String
});

//referenciar el Schema al modelo Users
module.exports = mongoose.model('Users', UserSchema);
