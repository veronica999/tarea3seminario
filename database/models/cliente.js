const mongoose = require('../connect');
const Schema = mongoose.Schema;

const clienteSchema = Schema({
    nombre: String,
    ci : String,
    saldo : Number,
    fechaderegistro : String

  }
})

const cliente = mongoose.model('cliente', clienteSchema);

module.exports = cliente;
