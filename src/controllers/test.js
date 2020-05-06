const Util = require('../utils/util');
const paramsValidator = require('../validators/fluent-validator');

exports.works = async (req, res, next) => {
    try {
        res.status(200).send('test works!');
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.sendmail = async (req, res, next) => {
    try {
        let result = [];

        const contract = new paramsValidator();
        
        contract.isRequired(req.body.to, 'EMAIL TO IS REQUIRED');
        contract.isRequired(req.body.subject, 'SUBJECT IS REQUIRED');
        contract.isRequired(req.body.message, 'MESSAGE IS REQUIRED');
        
        if (!contract.isValid()) {
            res.status(412).send(contract.errors());
            return;
        }
        
        const to = req.body.to;
        const subject = req.body.subject;
        const message = req.body.message;
        
        //send mail
        const Utils = new Util();
        result = await Utils.sendmail(to, subject, 'emails/test.html');
        
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}