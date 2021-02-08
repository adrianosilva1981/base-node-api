const paramsValidator = require('../validators/fluent-validator');

exports.echo = async (req, res, next) => {
    res.status(200).send('notify works!');
}