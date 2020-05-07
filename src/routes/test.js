const express = require('express');
const router = express.Router();
const controller = require('../controllers/test')

router.get('/', controller.works);
router.post('/sendmail', controller.sendmail);
router.get('/create-csv', controller.createCsv);

module.exports = router;