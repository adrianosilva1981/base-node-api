const authService = require('../services/authService'); //services/auth-service
const authRepository = require('../repositories/authRepository');
const paramsValidator = require('../validators/fluent-validator');
var phpPassword = require("node-php-password");

exports.auth = async (req, res, next) => {
    try {
        const contract = new paramsValidator();

        contract.isRequired(req.body.email, "O campo 'email' é obrigatório");
        contract.isRequired(req.body.password, "O campo 'password' é obrigatório");

        if (!contract.isValid()) {
            res.status(412).send(contract.errors());
            return;
        }

        let result = []

        const email = req.body.email
        const password = req.body.password
        const authUser = await authRepository.authorize(email)

        if (!authUser.length) {
            res.status(404).send({ 'message': 'Email não encontrado' });
            return;
        }

        if (phpPassword.verify(password, authUser[0].password)) {
            const token = await authService.generateToken({
                id: authUser[0].id,
                email: authUser[0].email,
                name: authUser[0].name
            });

            result.push({
                id: authUser[0].id,
                email: authUser[0].email,
                name: authUser[0].name,
                token: token
            });
        } else {
            result = { message: 'Senha inválida' };
        }

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: { message: error.message } });
    }
};

// testing...
exports.isTokenValid = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ error: { message: error.message } });
    }
};
