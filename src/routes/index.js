const express = require('express');
const router = express.Router();
const env = require('../config/environments');

router.get('/', function (req, res, next) {
    res.status(200).send({
        title: env.name,
        version: env.version
    });
});

module.exports = router;
