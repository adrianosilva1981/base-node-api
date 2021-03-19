const paramsValidator = require('../validators/fluent-validator');
const server = require('../../bin/server')

exports.broadcast = async (req, res, next) => {
    try {
        const contract = new paramsValidator();
        contract.isRequired(req.body.message, "O campo 'message' é obrigatório");

        if (!contract.isValid()) {
            res.status(412).send(contract.errors());
            return;
        }

        server.io.emit('broadcast', req.body.message)
        next()

        res.status(200).send({ message: 'Notificações enviadas' });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.groups = async (req, res, next) => {
    try {
        const groups = req.body.groups;
        const message = req.body.message;
        const contract = new paramsValidator();

        contract.isRequired(message, "O campo 'message' é obrigatório");
        contract.isRequired(message, "O mensagem é obrigatória");

        if (!contract.isValid()) {
            res.status(412).send(contract.errors());
            return;
        }

        if (!groups.length) {
            res.status(412).send({ message: "A lista de grupos é obrigatória" });
            return;
        }

        groups.forEach(el => {
            server.io.emit(el, message)
            next()
        });

        res.status(200).send({ message: 'Notificações enviadas' });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.clients = async (req, res, next) => {
    try {
        const clients = req.body.clients;
        const message = req.body.message;
        const contract = new paramsValidator();

        contract.isRequired(clients, "O campo 'clients' é obrigatório");
        contract.isRequired(message, "O mensagem é obrigatória");

        if (!contract.isValid()) {
            res.status(412).send(contract.errors());
            return;
        }

        if (!clients.length) {
            res.status(412).send({ message: "A lista de clientes é obrigatória" });
            return;
        }

        clients.forEach(el => {
            server.io.emit(`client_${el}`, message)
            next()
        });

        res.status(200).send({ message: 'Notificações enviadas' });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}