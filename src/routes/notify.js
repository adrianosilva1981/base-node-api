const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const controller = require('../controllers/notifyController')

router.post('/broadcast', authService.authorize, controller.broadcast);
router.post('/groups', authService.authorize, controller.groups);
router.post('/clients', authService.authorize, controller.clients);

module.exports = router;