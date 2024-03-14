const Region = require('../models/region.model');


exports.crearRegion = async (req, res) => {
  try {
    const region = new Region(req.body);
    await region.save();
    res.status(201).send(region);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Controlador para obtener todas las regiones
exports.getTodo = async (req, res) => {
  try {
    const regions = await Region.find();
    res.send(regions);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controlador para obtener una región por su ID
exports.getPorid = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    if (!region) {
      return res.status(404).send();
    }
    res.send(region);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controlador para actualizar una región por su ID
exports.actualizar = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['global', 'latam', 'europa', 'turquia', 'argen'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const region = await Region.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!region) {
      return res.status(404).send();
    }
    res.send(region);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Controlador para eliminar una región por su ID
exports.borrar = async (req, res) => {
  try {
    const region = await Region.findByIdAndDelete(req.params.id);
    if (!region) {
      return res.status(404).send();
    }
    res.send(region);
  } catch (error) {
    res.status(500).send(error);
  }
};
