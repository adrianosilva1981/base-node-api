const express = require('express');
const router = express.Router();
const controller = require('../controllers/notifyController')

router.post('/broadcast', controller.broadcast);
router.post('/groups', controller.groups);
router.post('/clients', controller.clients);

module.exports = router;