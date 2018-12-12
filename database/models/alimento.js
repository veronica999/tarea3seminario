const mongoose = require('../connect');
const Schema = mongoose.Schema;

const alimentoSchema = Schema({
    nombre: String,
    calorias : Number,
    hidratosCa : Number,
    proteinas : Number,
    grasaa : Number,
    fibra : Number

  }
})

const alimento = mongoose.model('Usuario', alimentoSchema);

module.exports = alimento;
