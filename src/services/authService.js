'use strict';

const jwt = require('jsonwebtoken');

exports.generateToken = async data => jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });

exports.decodeToken = async (token) => {
  const data = await jwt.verify(token, global.SALT_KEY);
  return data;
};

exports.authorize = function (req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    res.status(401).json({
      message: 'RESTRICT ACCESS'
    });
  } else {
    jwt.verify(token, global.SALT_KEY, (error, decoded) => {
      if (error) {
        res.status(401).json({
          message: 'INVALID TOKEN'
        });
      } else {
        next();
      }
    });
  }
};