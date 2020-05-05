const authService = require('../services/auth-service');
const authRepository = require('../repositories/auth');
const paramsValidator = require('../validators/fluent-validator');

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
        const password = req.body.password;
        const authorize = await authRepository.authorize(email, password);

        if (authorize) {
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
            result = authorize;
            console.log(result);
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
