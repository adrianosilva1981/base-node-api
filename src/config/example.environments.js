global.SALT_KEY = '62f5874d-8c3d-409c-a811-c41651da91cb';

module.exports = {
    name: 'api octos',
    version: '0.0.1',
    production: false,
    mysql_conn: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'base',
        port: 3306
    },
    mail: {
        host: 'mail.com.br',
        port: 587,
        secure: false, // true for 465, false for other ports
        from: '"SYSTEM" <system@email.com.br>',
        auth: {
            user: 'system@email.com.br',
            pass: 'pass'
        }
    },
    certificates_path: '',
    runnning_port: 3000,
    socket_port: 4555
}