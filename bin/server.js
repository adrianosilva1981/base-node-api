const fs = require('fs')
const env = require('../src/config/environments')
const app = require('../src/app')
const port = env.runnning_port
const socketPort = env.socket_port
// with ssl
// const https = require('https');

// without ssl
const http = require('http')

// with ssl
// const privateKey = fs.readFileSync(`${env.certificates_path}server.key`, 'utf8');
// const certificate = fs.readFileSync(`${env.certificates_path}server.cert`, 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// with ssl
// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(port, () => { console.log(`api listening on port ${port}`) });

// without ssl
const httpServer = http.createServer(app)
const pushServer = http.createServer(app).listen(socketPort)
const io = require("socket.io")(pushServer, {})

/* io.on("connection", (socket) => {
    console.log(`push server listening on port ${socketPort}`)
}) */

httpServer.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

exports.io = io;
