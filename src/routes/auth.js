const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const controller = require('../controllers/authController')

router.post('/', controller.auth);
router.get('/is-valid-token', authService.authorize, controller.isTokenValid);

module.exports = router;