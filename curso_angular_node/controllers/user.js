'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(request,response){
  response.status(200).send({
    message: 'entrando a la funcion de pruebas'
  });
}

function saveUser(request,response){
  var user = new User();
  var params = request.body;

  console.log(params);

  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.role = 'ROLE_USER';
  user.image = 'null';

  if(params.password){
    // Encriptar contraseña
    bcrypt.hash(params.password,null,null,function(error,hash){
        user.password = hash;
        if(user.name != null && user.surname != null && user.email != null){
            // Guardar el usuario
            user.save((error,userStored) => {
                if(error){
                    response.status(500).send({message: 'Error al guardar el usuario'});
                }else{
                    if(!userStored){
                      response.status(404).send({message: 'No se ha registrado el usuario'});
                    }else{
                      response.status(200).send({user:userStored});
                    }
                }
            });
        }else{
            response.status(200).send({message: 'Rellene todos los campos'});
        }
    });
  }else{
      response.status(500).send({message: 'Introduce la contraseña'});
  }

}

function loginUser(request,response){
    var user = new User();
    var params = request.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email:email.toLowerCase()},(error,usuario) => {
      if(error){
          response.status(500).send({message:'Error en la petición'});
      }else{
          if(!user){
              response.status(404).send({message:'El usuario no éxisten'});
          }else{
              bcrypt.compare(password,usuario.password,function(error,check){
                  if(check){
                    // devolvemos los datos de usuario
                    //response.status(200).send({user});
                    if(params.gethash){
                        // devolver un token jwt
                        response.status(200).send({
                          token: jwt.createToken(usuario)
                        });
                    }else{
                      response.status(200).send({usuario});
                    }
                  }else{
                    response.status(404).send({message:'El usuario no ha podido loguearse'});
                  }
              });
          }
      }

    });
}

module.exports = {
  pruebas,
  saveUser,
  loginUser
};
