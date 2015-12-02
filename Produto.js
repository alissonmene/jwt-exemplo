var mongoose = require('mongoose');
var Produto = new mongoose.Schema({
  nome: {
    type: String,
    unique: true,
  },
  descricao: {
    type: String,
  },
  categoria:{
    type:String,
  }
});

module.exports = mongoose.model('Produto', Produto);