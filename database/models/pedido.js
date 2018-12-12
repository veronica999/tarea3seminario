const mongoose = require('../connect');
const Schema = mongoose.Schema;

const pedidoSchema = Schema({
    descripcion: String,
    fechaentrga: Date,
    fechaderegistro: Date,
    entregado : Boolean,
    costetotal : Number,
    cliente : String,
    productos : String


  }
})

const pedido = mongoose.model('pedido', pedidoSchema);

module.exports = pedido;
