'use strict';

const mysql = require('mysql');
const conn = require('../config/environments');
const connection = mysql.createConnection(conn.mysql_conn);

exports.execQuery = (query) => {
    return new Promise((resolve, reject) => {
        connection.connect();
        connection.query(query, (error, results) => {
            if (error) reject(new Error(error)); else resolve(results);
            connection.end();
        });
    });
}