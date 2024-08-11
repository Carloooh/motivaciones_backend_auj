const mongoose = require("mongoose");

const motivacionSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  etiquetas: [String],
});

const Motivacion = mongoose.model("motivacion", motivacionSchema);

module.exports = Motivacion;