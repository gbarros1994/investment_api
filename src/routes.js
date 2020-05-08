const express = require('express');
const UserController = require('./controller/UserController');
const BitCoin = require('./controller/BitCoinController');
const BankController = require('./controller/BankController');
const SessionController = require('./controller/SessionController');

const routes = express.Router();

routes.post('/user', UserController.createUser);
routes.get('/bitcoin/price', BitCoin.price);
routes.post('/bank/deposit', BankController.createUserDeposit);
routes.get('/bank/extract/:id', BankController.extractUser);
routes.post('/session',SessionController.store);

module.exports = routes;