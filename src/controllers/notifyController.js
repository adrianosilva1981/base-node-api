const paramsValidator = require('../validators/fluent-validator');
const server = require('../../bin/server')

exports.echo = async (req, res, next) => {
    if (req.query.notification) {
        server.io.emit('notificacao', req.query.notification)
        next()
    }
    res.status(200).send('notify works!');
}