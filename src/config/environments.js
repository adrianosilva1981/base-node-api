global.SALT_KEY = '62f5874d-8c3d-409c-a811-c41651da91cb';

module.exports = {
    name: 'api octos',
    version: '0.0.1',
    production: false,
    mysql_conn: {
        address: 'localhost',
        username: 'root',
        password: '',
        database: 'base1',
        port: 3306
    },
    mail: {
        host: 'mail.devadriano.com.br',
        port: 587,
        secure: false, // true for 465, false for other ports
        from: '"SYSTEM" <system@devadriano.com.br>',
        auth: {
            user: 'system@devadriano.com.br',
            pass: '4wlP-#{^qVJH'
        }
    },
    certificates_path: 'C:\\Projetos\\api-webmoview\\bin\\',
    runnning_port: 3000
}