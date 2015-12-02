var Model = require('./ModelUsuario');
var Produto = require('./Produto');
var Gerente = require('./Gerente');
var Login  = require('./controllerLogin');


module.exports = {
  getUsuarios: function(req, res){
    res.json({message: "Token Adquirido com Sucesso :DDDDDD"})
  },

  getTodosUsuarios: function(req, res){

   	Model.find(function(err, usuarios) {
  			if (err) return res.send(err);
 			 	res.json({usuarios:usuarios })
 			});
  },


   postEncontrarUsuario: function(req, res){

   Model.findOne({ username: req.body.username }, function(err, usuario) {
  	if (err) return res.send(err);
  		res.json({usuario:usuario })
	});

	},


  inserirProduto: function(req, res){

    produto =  new Produto ();
    produto.nome = req.body.nome;
    produto.descricao = req.body.descricao;
    produto.categoria = req.body.categoria;
    produto.save(function(err,produto) {
    if (err) {
          res.json({mensagem:"erro ao salvar produto" + err })
    }
      res.json({ mensagem : "Produto adicionado com sucesso",
          nome : produto.nome,
                 produto : produto.descricao,
                 categoria : produto.categoria

       })
 
    });

  },


  excluirProduto: function(req, res){

    produto =  new Produto ();
    produto.nome = req.body.nome;
    produto.remove(function(err,produto) {
    if (err) {
          res.json({mensagem:"erro ao excluir produto " + err })
    }
      res.json({produtos:"Produto Excluido com sucesso " + produto })
 
    });

  },


pesquisarProduto: function(req, res){

    produto =  new Produto ();
     var nome = req.body.nome;
    Produto.findOne({nome, nome},function(err,produto) {
    if (err) {
          res.json({mensagem:"erro ao pessquisar produto " + err })
    }

      res.json({produtos:"Produto encontrado com sucesso ",
                 nome : produto.nome,
                 produto : produto.descricao,
                 categoria : produto.categoria
       })
 
    });

  },


  inserirGerente : function(req, res){
      var data = new Gerente({
        username: req.body.username,
        password: req.body.password
        });
        data.save(function(err) {
          if (err)
            res.send(err);
          res.json({ message: 'Novo Gerente', username : data.username });
        });
    },

  postUsuarios: require('./controllerCriaUsuario'),
  loginUsuario: Login.gerarTokenUsuario,
  loginGerente: Login.gerarTokenGerente
}