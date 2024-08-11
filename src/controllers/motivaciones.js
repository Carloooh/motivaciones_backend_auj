const Motivacion = require("../models/motivaciones");

async function getMotivaciones(req, res) {
  try {
    const motivaciones = await Motivacion.find();
    res.json(motivaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getMotivacionById(req, res) {
  try {
    const motivacion = await Motivacion.findById(req.params.id);
    if (!motivacion) {
      return res.status(404).json({ error: "Motivación no encontrada" });
    }
    res.json(motivacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addMotivacion(req, res) {
  try {
    const { titulo, descripcion, etiquetas } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({ error: "Título y descripción son requeridos" });
    }

    const nuevaMotivacion = new Motivacion({ titulo, descripcion, etiquetas });
    await nuevaMotivacion.save();

    res.status(201).json(nuevaMotivacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateMotivacion(req, res) {
  try {
    const motivacionId = req.params.id;
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No hay datos para actualizar" });
    }

    const motivacion = await Motivacion.findByIdAndUpdate(
      motivacionId,
      { $set: updateData }, 
      { new: true, runValidators: true }
    );

    if (!motivacion) {
      return res.status(404).json({ error: "Motivación no encontrada" });
    }

    res.json(motivacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteMotivacion(req, res) {
  try {
    const motivacion = await Motivacion.findByIdAndDelete(req.params.id);
    if (!motivacion) {
      return res.status(404).json({ error: "Motivación no encontrada" });
    }
    res.json({ message: "Motivación eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getMotivaciones,
  getMotivacionById,
  addMotivacion,
  updateMotivacion,
  deleteMotivacion,
};
