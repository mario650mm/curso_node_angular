'use strict'

//var firebase = require('firebase');
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/curso_node_angular2',(error,response) => {
	if(error){
		throw error;
	}else{
		console.log('Conexión a la base de datos éxitosa');
		app.listen(port,function(){
			console.log('Servidor corriendo en el puerto '+port);
		});
	}
});
