const mongoose = require('../connect');
const Schema = mongoose.Schema;

const productoSchema = Schema({
    nombre: String,
    descripcion : String,
    precio : Number,
    stock : String

  }
})

const producto = mongoose.model('producto', productoSchema);

module.exports = producto;
