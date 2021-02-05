'use strict';

const connService = require('../../services/mysqlConnect')

exports.authorize = (email, pass) => {
    const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${pass}' LIMIT 1;`
    return connService.execQuery(query)
};