var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')
  , jwt = require('jwt-simple');
  //var db = 'mongodb://alisson:alisson@ds053428.mongolab.com:53428/teste-jwt';//coloque a url do db aqui
  var db = 'mongodb://localhost/teste-jwt';//coloque a url do db aqui
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  var port = process.env.PORT || 9090;
  var router = express.Router();
  app.use('/api', router);
  var rotas = require('./rotas');
  var validarJWT = require('./validarJWT');




  router.route('/usuarios').get(validarJWT.tokenUsuario, rotas.getUsuarios);
  router.route('/todosUsuarios').get(validarJWT.tokenUsuario, rotas.getTodosUsuarios);  
  router.route('/encontrarUsuario').post(validarJWT.tokenUsuario, rotas.postEncontrarUsuario);  
  router.route('/inserirProduto').post(validarJWT.tokenGerente, rotas.inserirProduto);  
  router.route('/excluirProduto').post(validarJWT.tokenGerente, rotas.excluirProduto);  

  router.route('/pesquisarProduto').post(validarJWT.tokenUsuario, rotas.pesquisarProduto);
  router.route('/inserirUsuarios').post(rotas.postUsuarios);
  router.route('/inserirGerente').post(rotas.inserirGerente);
  

  router.route('/loginUsuario').post(rotas.loginUsuario);
  router.route('/loginGerente').post(rotas.loginGerente);

  mongoose.connect(db);
  app.listen(port);
  console.log('conectado a porta ' + port);
