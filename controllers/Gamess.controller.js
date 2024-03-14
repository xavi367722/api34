const Games = require('../models/gamess.model');


exports.crear = async (req, res) => {
  try {
    const game = new Games(req.body);
    await game.save();
    res.status(201).send(game);
  } catch (error) {
    res.status(400).send(error);
  }
};


exports.getTodo = async (req, res) => {
  try {
    const games = await Games.find();
    res.send(games);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getPorid = async (req, res) => {
  try {
    const game = await Games.findById(req.params.id);
    if (!game) {
      return res.status(404).send();
    }
    res.send(game);
  } catch (error) {
    res.status(500).send(error);
  }
};


exports.actualizar = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['Nombre', 'Cuenta', 'Precio'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'error ijo!' });
  }

  try {
    const game = await Games.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!game) {
      return res.status(404).send();
    }
    res.send(game);
  } catch (error) {
    res.status(400).send(error);
  }
};


exports.borrar = async (req, res) => {
    try {
      const game = await Games.findByIdAndDelete(req.params.id);
      if (!game) {
        return res.status(404).send();
      }
      res.send(game);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  