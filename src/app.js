const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('./config/environments');

// routes
const index = require('./routes/index');
const authRoute = require('./routes/auth/auth');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// enable CORS - in the OCTOS I think that's not necessary
if (!env.production) {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });
}

app.use('/', index);
app.use('/auth', authRoute);

module.exports = app;