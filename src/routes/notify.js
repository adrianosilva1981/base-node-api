const express = require('express');
const router = express.Router();
const controller = require('../controllers/notifyController')

router.get('/', controller.echo);

module.exports = router;