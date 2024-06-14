
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/menus', menuController.getMenus);
router.post('/menus', menuController.addMenu);
router.put('/menus/:id', menuController.updateMenu);
router.delete('/menus/:id', menuController.deleteMenu);

module.exports = router;