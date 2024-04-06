const Usuario = require('../models/usuario.models');

// Controlador para crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body); // Crear una nueva instancia de Usuario utilizando los datos del cuerpo de la solicitud
    await usuario.save(); // Guardar el nuevo usuario en la base de datos
    res.status(201).send(usuario); // Enviar una respuesta con el usuario creado y un código de estado 201 (Created)
  } catch (error) {
    res.status(400).send(error); // Enviar una respuesta con un código de estado 400 (Bad Request) si hay un error
  }
};

// Controlador para obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // Obtener todos los usuarios de la base de datos
    res.send(usuarios); // Enviar una respuesta con los usuarios obtenidos
  } catch (error) {
    res.status(500).send(error); // Enviar una respuesta con un código de estado 500 (Internal Server Error) si hay un error
  }
};

// Controlador para obtener un usuario por su ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id); // Buscar un usuario por su ID en la base de datos
    if (!usuario) {
      return res.status(404).send(); // Enviar una respuesta con un código de estado 404 (Not Found) si el usuario no se encuentra
    }
    res.send(usuario); // Enviar una respuesta con el usuario encontrado
  } catch (error) {
    res.status(500).send(error); // Enviar una respuesta con un código de estado 500 (Internal Server Error) si hay un error
  }
};

// Controlador para actualizar un usuario por su ID
exports.updateUsuario = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['Username', 'Email', 'Password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' }); // Enviar una respuesta con un código de estado 400 (Bad Request) si hay una operación no válida
  }

  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Buscar y actualizar un usuario por su ID
    if (!usuario) {
      return res.status(404).send(); // Enviar una respuesta con un código de estado 404 (Not Found) si el usuario no se encuentra
    }
    res.send(usuario); // Enviar una respuesta con el usuario actualizado
  } catch (error) {
    res.status(400).send(error); // Enviar una respuesta con un código de estado 400 (Bad Request) si hay un error
  }
};

// Controlador para eliminar un usuario por su ID
exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id); // Buscar y eliminar un usuario por su ID
    if (!usuario) {
      return res.status(404).send(); // Enviar una respuesta con un código de estado 404 (Not Found) si el usuario no se encuentra
    }
    res.send(usuario); // Enviar una respuesta con el usuario eliminado
  } catch (error) {
    res.status(500).send(error); // Enviar una respuesta con un código de estado 500 (Internal Server Error) si hay un error
  }
};
