'use strict';

const nodemailer = require('nodemailer');
const env = require('../config/environments');
const handlebars = require('handlebars');
const fs = require('fs');

class Util {
    constructor() { }

    encrytpt(data) {
        let aux = Buffer.from(data).toString('base64');
        aux = aux.replace(/A/g, '_');
        aux = aux.replace(/a/g, '_');
        aux = aux.replace(/=/g, 'keyword_');
        aux = aux.split('').reverse().join('');
        return aux;
    }

    decrypt(data) {
        let aux = aux.split('').reverse().join('');
        aux.replace(/keyword_/, '=');
        aux.replace(/-/g, 'a');
        aux.replace(/_/, 'A');
        aux = Buffer.from(aux, 'base64').toString('ascii');
        return aux;
    }

    async sendmail(to, subject, tmpl) {
        let info = ['none...'];

        let readHTMLFile = (path, success, err) => {
            fs.readFile(path, { encoding: 'utf-8' }, function (error, html) {
                if (error) { 
                    err(error);
                } else {
                    success(html);
                }
            });
        };

        let transporter = nodemailer.createTransport({
            host: env.mail.host,
            port: env.mail.port,
            ignoreTLS: true,
            secure: env.mail.secure,
            auth: {
                user: env.mail.auth.user,
                pass: env.mail.auth.pass
            }
        });

        readHTMLFile(`${__dirname}\\..\\templates\\${tmpl}`,
            (result) => {
                const template = handlebars.compile(result);
                const replacements = { username: "Adriano Silva" };
                const html = template(replacements);

                info = transporter.sendMail({
                    from: env.mail.from,
                    to: to,
                    subject: subject,
                    html: html
                });
            },
            (error) => {
                info = error
            }
        );

        return info;
    }
}

module.exports = Util;