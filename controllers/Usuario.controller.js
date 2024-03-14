const Usuario = require('../models/usuario.models');

// Controlador para crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).send(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Controlador para obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.send(usuarios);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controlador para obtener un usuario por su ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).send();
    }
    res.send(usuario);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controlador para actualizar un usuario por su ID
exports.updateUsuario = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['Username', 'Email', 'Password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!usuario) {
      return res.status(404).send();
    }
    res.send(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Controlador para eliminar un usuario por su ID
exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).send();
    }
    res.send(usuario);
  } catch (error) {
    res.status(500).send(error);
  }
};
