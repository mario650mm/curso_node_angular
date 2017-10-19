'use strict'

var express = require('express');
var bodyParse = require('body-parser');

var app = express();

// Cargar rutas
var user_routes = require('./routes/user');

// Rutas de api
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

// rutas base
app.use('/api',user_routes);


app.get('/pruebas',function(request,response){
	response.status(200).send({message:'Bienvenido al curso'});
});


module.exports = app;
