const express = require('express');
const UserController = require('./controller/UserController');
const BitCoin = require('./controller/BitCoinController');
const BankController = require('./controller/BankController');
const SessionController = require('./controller/SessionController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/user', UserController.createUser);
routes.post('/session',SessionController.store);

//OBRIGA O USUÁRIO A TER UM HASH VALIDA PARA ACESSAR OUTRAS
routes.use(authMiddleware.auth);

routes.put('/user', UserController.updateUser);

//COTAÇÃO DE COMPRA E VENDA BITCOIN
routes.get('/bitcoin/price', BitCoin.price);
routes.post('/bitcoin/buy', BitCoin.buy);


routes.post('/bank/deposit', BankController.createUserDeposit);
routes.get('/bank/extract/:id', BankController.extractUser);

//Faça um endpoint que retorne o total de bitcoins comprados e vendidos no dia corrente.


/* Deve haver um endpoint com o histórico de valor de compra/venda do bitcoin que retorne o valor
 com frequência de 10 minutos (8:00, 8:10, 8:20, ...) das últimas 24 horas.
Dados com mais de 90 dias devem ser expurgados automaticamente. */

module.exports = routes;