var Usuario = require('./ModelUsuario');
var jwt = require('jwt-simple');
var moment = require('moment');
var segredo = 'seusegredodetoken';

var Gerente = require('./Gerente');

module.exports = { 

  gerarTokenUsuario: function(req, res) {
  var username = req.body.username || '';
  var password = req.body.password || '';
  if (username == '' || password == '') {
    return res.send(401);
  }
  //1
  Usuario.findOne({username: username}, function (err, user) {
  	if (err) {
      return res.json(401, err)
    }

    if (username == null){
          return res.json(401,{mensagem:" Usuario não encontrado"})
    }

    console.log(username);
    //2
    user.verificaSenha(password, function(isMatch) {
      if (!isMatch) {
        console.log("Attempt failed to login with " + user.username);
        return res.send(401);
      }
    //3
  	var expires = moment().add(5,'minutes').valueOf();
    var token = jwt.encode({
      iss: user.id,
      exp: expires,
      admin: false
    }, segredo);
    //4
     return res.json({
     	token : token,
      expires: expires,
      username: user.username
      });
      });
    });
},

 gerarTokenGerente: function(req, res) {
  var username = req.body.username || '';
  var password = req.body.password || '';
  if (username == '' || password == '') {
    return res.send(401);
  }
  //1
  Gerente.findOne({username: username}, function (err, gerente) {
    if (err) {
      return res.json(401, err)
    }
    //2
    gerente.verificaSenha(password, function(isMatch) {
      if (!isMatch) {
        console.log("Attempt failed to login with " + gerente.username);
        return res.send(401);
      }
    //3
    var expires = moment().add(5,'minutes').valueOf();
    var token = jwt.encode({
      iss: gerente.id,
      exp: expires,
      admin:true
    }, segredo);
    //4
     return res.json({
      token : token,
      expires: expires,
      username: gerente.username
      });
      });
    });
}

};