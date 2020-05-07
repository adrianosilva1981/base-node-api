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

exports.createCsv = async (req, res, next) => {
    try {
        let result = [];

        const header = [
            { id: 'name', title: 'Name' },
            { id: 'surname', title: 'Surname' },
            { id: 'age', title: 'Age' },
            { id: 'gender', title: 'Gender' },
        ];

        const data = [
            {
                name: 'John',
                surname: 'Snow',
                age: 26,
                gender: 'M'
            },
            {
                name: 'Clair',
                surname: 'White',
                age: 33,
                gender: 'F',
            }, 
            {
                name: 'Fancy',
                surname: 'Brown',
                age: 78,
                gender: 'F'
            }
        ];

        //create csv
        const Utils = new Util();
        // result = await Utils.csvCreator('test.csv', header, data);
        
        // to async response, delete 'await'
        // result = Utils.csvCreator('test.csv', header, data);
        
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}