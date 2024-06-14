// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/admin', adminController.getAdmin);
router.post('/admin', adminController.addAdmin);

module.exports = router;