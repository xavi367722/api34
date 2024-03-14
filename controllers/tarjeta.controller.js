const Tarjeta = require('../models/tarjeta.model');

// Controlador para crear una nueva tarjeta
exports.createTarjeta = async (req, res) => {
  try {
    const tarjeta = new Tarjeta(req.body);
    await tarjeta.save();
    res.status(201).send(tarjeta);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Controlador para obtener todas las tarjetas
exports.getTodo = async (req, res) => {
  try {
    const tarjetas = await Tarjeta.find();
    res.send(tarjetas);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controlador para obtener una tarjeta por su ID
exports.getPorid = async (req, res) => {
  try {
    const tarjeta = await Tarjeta.findById(req.params.id);
    if (!tarjeta) {
      return res.status(404).send();
    }
    res.send(tarjeta);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controlador para actualizar una tarjeta por su ID
exports.actualizar = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['NumTarjeta', 'Fecha', 'Cvv', 'Titular'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const tarjeta = await Tarjeta.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tarjeta) {
      return res.status(404).send();
    }
    res.send(tarjeta);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Controlador para eliminar una tarjeta por su ID
exports.borrar = async (req, res) => {
  try {
    const tarjeta = await Tarjeta.findByIdAndDelete(req.params.id);
    if (!tarjeta) {
      return res.status(404).send();
    }
    res.send(tarjeta);
  } catch (error) {
    res.status(500).send(error);
  }
};
