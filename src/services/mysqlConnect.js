'use strict';

const mysql = require('mysql');
const conn = require('../config/environments');

exports.execQuery = (query) => {
    const connection = mysql.createConnection(conn.mysql_conn);
    return new Promise((resolve, reject) => {
        connection.connect();
        connection.query(query, (error, results) => {
            if (error) reject(new Error(error)); else resolve(results);
            connection.end();
        });
    });
}