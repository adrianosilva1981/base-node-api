'use strict';

const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection({
    host: config.mysql_conn.address,
    user: config.mysql_conn.username,
    password: config.mysql_conn.password,
    database: config.mysql_conn.database
});

// you can pass the connection parameters here to connect in differents databases
// exports.authorize = (email, pass, host, user, password...) => { 
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