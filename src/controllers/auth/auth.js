const authService = require('../../services/auth-service'); //services/auth-service
const authRepository = require('../../repositories/auth/auth');
const paramsValidator = require('../../validators/fluent-validator');
const bcrypt = require('bcrypt');

exports.auth = async (req, res, next) => {
    try {
        const contract = new paramsValidator();

        contract.isRequired(req.body.email, 'EMAIL IS REQUIRED');
        contract.isRequired(req.body.password, 'PASSWORD IS REQUIRED');

        if (!contract.isValid()) {
            res.status(412).send(contract.errors());
            return;
        }

        let result = []

        const email = req.body.email;
        const password = bcrypt.hashSync(req.body.password, 0);
        const authorize = await authRepository.authorize(email, password);

        console.log(password)

        if (authorize.length) {
            const token = await authService.generateToken({
                id: authorize[0].id,
                email: authorize[0].email,
                name: authorize[0].name
            });

            result.push({
                id: authorize[0].id,
                email: authorize[0].email,
                name: authorize[0].name,
                token: token
            });
        } else {
            result = {'message': 'INVALID LOGIN'};
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
