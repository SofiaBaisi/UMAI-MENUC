exports.getMenus = (req, res) => {
  res.sendFile('public/menus.html', { root: '.' });
};

const Menu = require('../models/Menu');


  exports.addMenu = (req, res) => {
    const { name } = req.body;
    const id = menus.length + 1;
    menus.push({ id, name });
    res.status(201).json({ id, name });
  };
  
  exports.updateMenu = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const menu = menus.find(m => m.id === parseInt(id));
    if (menu) {
      menu.name = name;
      res.status(200).json(menu);
    } else {
      res.status(404).json({ message: 'Menu not found' });
    }
  };
  
  exports.deleteMenu = (req, res) => {
    const { id } = req.params;
    const index = menus.findIndex(m => m.id === parseInt(id));
    if (index !== -1) {
      menus.splice(index, 1);
      res.status(200).json({ message: 'Menu deleted' });
    } else {
      res.status(404).json({ message: 'Menu not found' });
    }
  };
  