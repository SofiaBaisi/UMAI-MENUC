const userModel = require('../models/user');

exports.registerUser = async (req, res) => {
  const userId = req.body.userId;
 
  res.json({ message: 'User registered successfully' });
};

exports.deactivateUser = async (req, res) => {
  const userId = req.body.userId;
  
  res.json({ message: 'User deactivated successfully' });
};

// controllers/admin.js

exports.getAdmin = (req, res) => {
  res.sendFile('public/admin.html', { root: '.' });
};

exports.addAdmin = (req, res) => {
  const { username, password, role } = req.body;
  const newAdmin = { username, password, role };
  admins.push(newAdmin);
  res.status(201).json(newAdmin);
};

// Aquí puedes agregar más rutas de administrador

const admins = [
  // Aquí puedes agregar administradores
];