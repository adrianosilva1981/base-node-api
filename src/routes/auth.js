const express = require('express');
const router = express.Router();
const authService = require('../services/auth-service');
const controller = require('../controllers/auth')

router.post('/', controller.auth);
// testing...
router.get('/is-valid-token', authService.authorize, controller.isTokenValid);

module.exports = router;