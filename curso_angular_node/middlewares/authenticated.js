'use strict'


var jwt = require('jwt-simple');

var moment = require('moment');

var clave = 'secret';

exports.ensureAuth = function(request,response,next){
  if(!request.headers.authorization){
    return response.status(403).send({message:'la petición no tiene headers de authenticación'});
  }
  var token = request.headers.authorization.replace(/['"]+/g,'');

  console.log(token);

  console.log(request);

  try{
    var playload = jwt.decode(token,clave);
    if(playload.exp <= moment().unix()){
      return response.status(401).send({message:'su sesión ha expirado'});
    }
  }catch(e1){
    console.log(e1);
    return response.status(404).send({message:'sesión no válida'});
  }

  request.user = playload;
  next();

};
