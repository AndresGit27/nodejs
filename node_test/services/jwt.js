'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var key = 'clave';

exports.createToken = function(user){
    var data = {
        sub: user._id,
        name: user.name,
        lastname : user.lastname,
        email : user.email,
        role : user.role,
        iat: moment().unix(),//formato timestamp
        exp : moment().add(30, 'days').unix
    };
    
    return jwt.encode(data, key);
};