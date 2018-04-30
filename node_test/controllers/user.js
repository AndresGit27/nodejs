'use strict';

//modulo para encriptar
var bcrypt = require('bcrypt-nodejs');
//importando el modelo
var User = require('../models/user');
var jwt = require('../services/jwt');

function testUser(req,res){
    res.status(200).send({
        message: 'Probando el controlador User'
    });
}

function saveUser(req, res){
    var user = new User();
    
    var params = req.body;
    
    console.log(params);
    
    user.name = params.name;
    user.lastname = params.lastname;
    user.email = params.email;
    user.password = params.password;
    user.role = params.role;
    
    if(params.password){
        //encriptando la contraseña y guardar datos
        bcrypt.hash(params.password, null, null, function(err,hash){
            user.password = hash;
            if(user.name != null && user.lastname != null && user.email != null){
                user.save((err, userStored)=>{
                    if(err){
                        res.status(500).send({message:'Error al guardar usuario'});
                    }else{
                        if(!userStored){
                            res.status(404).send({message:'No se ha guardado el usuario'});
                        }else{
                            res.status(200).send({user:userStored});
                        }
                    }
                });
            }else{
                res.status(200).send({message:'Completar los campos'});
            }
        });
    }else{
        res.status(200).send({message:'Ingresa la contraseña'});
    }
    
}

function loginUser(req, res){
    var params = req.body;
    
    var email = params.email;
    var password = params.password;
//    email.toLowerCase();
    
    User.findOne({email: email.toLowerCase()},(err, user) => {
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!user){
                res.status(404).send({message:'El usuario no existe'});
            }else{
                //Verificar contraseña
                bcrypt.compare(password, user.password, function(err,check){
                    if(check){
                        //retornamos datos del usuario
//                        if(params.gethash){
                            //retornar token de JWT
                            res.status(200).send({token: jwt.createToken(user),userInto:user})
//                        }else{
//                            res.status(200).send({user});
//                        }
                    }else{
                        res.status(404).send({message:'El usuario no ha podido logearse'});
                    }
                });
            }
        }
    });
}

module.exports = {
  testUser,
  saveUser,
  loginUser
};


