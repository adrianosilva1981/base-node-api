const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');

// const router = express.Router();

// routes
const index = require('./routes/index');
const authRoute = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', index);
app.use('/auth', authRoute);

module.exports = app;