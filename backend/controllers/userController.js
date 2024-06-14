const User = require('../models/user');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const users = [
  { id: 1, username: 'Pablo Amado', active: true },
  { id: 2, username: 'Gisel Arao', active: true },
  { id: 3, username: 'Sandivel Prado', active: true },
  { id: 4, username: 'Maria Quinto', active: true },
  { id: 5, username: 'Charly Garcia', active: true },
  { id: 6, username: 'Gustavo Serati', active: true },
];

exports.register = (req, res) => {
  const { username } = req.body;
  const id = users.length + 1;
  users.push({ id, username, active: true });
  res.status(201).json({ id, username });
};

exports.getUsers = (req, res) => {
  res.json(users);
};

exports.deactivateUser = (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));
  if (user) {
    user.active = false;
    res.status(200).json({ message: 'User deactivated' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
