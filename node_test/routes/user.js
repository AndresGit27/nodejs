'use strict'

var express = require('express');
var UserController = require('../controllers/user');

//cargar el Router para crear rutas
var api = express.Router();
//cargar el middleware para la autenticacion
var auth = require('../middlewares/authenticated');

api.get('/user-test', auth.ensureAuth, UserController.testUser);
api.post('/registrar-usuario', UserController.saveUser);
api.post('/login', UserController.loginUser);

module.exports = api;

