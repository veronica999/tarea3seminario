const mongoose = require('../connect');
const Schema = mongoose.Schema;

const recetaSchema = Schema({
    nombre: String,
    instrucciones: String,
    porciones : String,
    tipo: String,
    ingredientes : String


const receta = mongoose.model('Restaurant', recetaSchema);

module.exports = receta;

//Nombre, Nit, Propietario, Calle, Telefono, Log, Lat, Logo, fechaderegistro, fotolugar
