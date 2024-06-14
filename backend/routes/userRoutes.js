const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  const { username, password, role } = req.body;
  const newUser = new User({ username, password, role, active: true });
  await newUser.save();
  res.json(newUser);
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    user.active = !user.active;
    await user.save();
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
