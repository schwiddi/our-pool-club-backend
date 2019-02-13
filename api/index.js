const express = require('express');
const clubs = require('./clubs');
const users = require('./users');
const auth = require('./auth');
const admin = require('./admin');
const api = express.Router();

const defaultRes = {
  'response': 'Hello!!!!',
};

api.use('/clubs/', clubs);
api.use('/users/', users);
api.use('/auth/', auth);
api.use('/admin/', admin);

api.get('/', (req, res) => {
  res.status(200).send(defaultRes);
});

module.exports = api;
