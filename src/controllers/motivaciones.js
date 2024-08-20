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

    etiquetas = etiquetas ? etiquetas.map(tag => tag.trim()) : [];

    if (titulo.length < 5 || titulo.length > 100) {
      return res.status(400).json({ error: "El título debe tener entre 5 y 100 caracteres" });
    }

    if (descripcion.length < 20) {
      return res.status(400).json({ error: "La descripción debe tener al menos 20 caracteres" });
    }

    if (etiquetas.length > 5) {
      return res.status(400).json({ error: "No se pueden tener más de 5 etiquetas" });
    }

    const nuevaMotivacion = new Motivacion({ titulo, descripcion, etiquetas });
    await nuevaMotivacion.save();

    res.status(201).json(nuevaMotivacion);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "El título ya existe, elija otro título" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

async function updateMotivacion(req, res) {
  try {
    const motivacionId = req.params.id;
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No hay datos para actualizar" });
    }

    if (updateData.titulo) {
      if (updateData.titulo.length < 5 || updateData.titulo.length > 100) {
        return res.status(400).json({ error: "El título debe tener entre 5 y 100 caracteres" });
      }
    }

    if (updateData.descripcion) {
      if (updateData.descripcion.length < 20) {
        return res.status(400).json({ error: "La descripción debe tener al menos 20 caracteres" });
      }
    }

    if (updateData.etiquetas) {
      updateData.etiquetas = updateData.etiquetas.map(tag => tag.trim());
      if (updateData.etiquetas.length > 5) {
        return res.status(400).json({ error: "No se puden tener mas de 5 etiquetas" });
      }
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
    if (error.code === 11000) {
      res.status(400).json({ error: "El título ya existe, elija otro título" });
    } else {
      res.status(500).json({ error: error.message });
    }
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
