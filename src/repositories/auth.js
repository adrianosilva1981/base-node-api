'use strict';

const mysql = require('mysql');
const conn = require('../config/environments');

let connection = mysql.createConnection({
    host: conn.mysql_conn.address,
    user: conn.mysql_conn.username,
    password: conn.mysql_conn.password,
    database: conn.mysql_conn.database
});

/*
you can pass the connection parameters here to connect in differents databases:
    exports.authorize = (email, pass, host, user, password...) => { 
or pass 'project' and 'module' to search database connections infos into json config:
    exports.getSomeData = (user, project, ) => { 
*/
exports.authorize = (email, pass) => {
    const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${pass}' LIMIT 1;`;

    return new Promise((resolve, reject) => {
        connection.connect();
        connection.query(query, (error, results) => {
            if (error) reject(new Error("error")); else resolve(results);
            connection.end();
        });
    });
};