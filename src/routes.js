const express = require('express');
const UserController = require('./controller/UserController');
const BitCoin = require('./controller/BitCoinController');
const BankController = require('./controller/BankController');
const SessionController = require('./controller/SessionController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

//OBRIGA O USUÁRIO A TER UM HASH VALIDA PARA ACESSAR OUTRAS
routes.use(authMiddleware.auth);

routes.post('/user', UserController.createUser);
routes.put('/user', UserController.updateUser);
routes.get('/bitcoin/price', BitCoin.price);
routes.post('/bank/deposit', BankController.createUserDeposit);
routes.get('/bank/extract/:id', BankController.extractUser);
routes.post('/session',SessionController.store);

module.exports = routes;