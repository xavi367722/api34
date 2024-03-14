const Tipo = require('../models/tipo.models');

// Controlador para crear un nuevo tipo
exports.createTipo = async (req, res) => {
  try {
    const tipo = new Tipo(req.body);
    await tipo.save();
    res.status(201).send(tipo);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Controlador para obtener todos los tipos
exports.getTodo = async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.send(tipos);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controlador para obtener un tipo por su ID
exports.getPorid = async (req, res) => {
  try {
    const tipo = await Tipo.findById(req.params.id);
    if (!tipo) {
      return res.status(404).send();
    }
    res.send(tipo);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controlador para actualizar un tipo por su ID
exports.actualizar = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['SteamKey', 'Cuenta'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const tipo = await Tipo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tipo) {
      return res.status(404).send();
    }
    res.send(tipo);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Controlador para eliminar un tipo por su ID
exports.borrar = async (req, res) => {
  try {
    const tipo = await Tipo.findByIdAndDelete(req.params.id);
    if (!tipo) {
      return res.status(404).send();
    }
    res.send(tipo);
  } catch (error) {
    res.status(500).send(error);
  }
};
