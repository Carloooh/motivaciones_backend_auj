const mongoose = require("mongoose");

const motivacionSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 100,
  },
  descripcion: {
    type: String,
    required: true,
    minlength: 20,
  },
  etiquetas: { 
    type: [String],
    validate: [arrayLimit, 'No se pueden tener mas de 5 etiquetas']
  }
});

function arrayLimit(val) {
  return val.length <= 5;
}

const Motivacion = mongoose.model("motivacion", motivacionSchema);

module.exports = Motivacion;