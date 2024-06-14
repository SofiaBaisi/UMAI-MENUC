const express = require('express');
const router = express.Router();

// Agregar un artículo al carrito
router.post('/add', (req, res) => {
  const { itemId, quantity } = req.body;
  res.json({ message: 'Artículo agregado al carrito', itemId, quantity });
});

// Eliminar un artículo del carrito
router.post('/remove', (req, res) => {
  const { itemId } = req.body;
  res.json({ message: 'Artículo eliminado del carrito', itemId });
});

module.exports = router;
