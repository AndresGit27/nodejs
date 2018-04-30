'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 4000;

//elimina aviso de la consola
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/node_test',(err, res) => {
    if(err){
        throw err;
    }else{
        console.log('Mongo DB corriendo correctamente OK!');
        app.listen(port, function(){
            console.log("Servidor escuchando en http://localhost"+port);
        });
    }
});