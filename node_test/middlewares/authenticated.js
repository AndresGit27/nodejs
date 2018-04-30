'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var key = 'clave';

//metodo para comprobar los datos del Token
exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');
    
    try{
        var data = jwt.decode(token, key);
        
        if(data.exp <= moment().unix()){
             return res.status(401).send({message: 'Token ha expirado'});
        }
        
    }catch(ex){
        console.log(ex);
        return res.status(404).send({message: 'Token no válido'});
    }
    //creando el objeto user en el request
    req.user = data;
    
    next();
};


