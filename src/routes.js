const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const UserController = require('./controller/UserController');
const BitCoin = require('./controller/BitCoinController');
const BankController = require('./controller/BankController');
const SessionController = require('./controller/SessionController');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })
}), UserController.create);
routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    })
}), SessionController.create);
routes.use(authMiddleware.auth);
routes.get('/user/extract/:id', UserController.extract);
routes.get('/bitcoin/price', BitCoin.price);
routes.post('/bitcoin/buy', celebrate({
    [Segments.BODY]: Joi.object().keys({
        idUser: Joi.string().required(),
        quantity: Joi.number().required(),
    })
}), BitCoin.buy);
routes.post('/banks/deposit', celebrate({
    [Segments.BODY]: Joi.object().keys({
        idUser: Joi.string().required(),
        value: Joi.number().required(),
        description: Joi.string().required(),
        status: Joi.string().required()
    })
}), BankController.create);
routes.get('/banks/extract/:id', BankController.extract);


//Faça um endpoint que retorne o total de bitcoins comprados e vendidos no dia corrente.


/* Deve haver um endpoint com o histórico de valor de compra/venda do bitcoin que retorne o valor
 com frequência de 10 minutos (8:00, 8:10, 8:20, ...) das últimas 24 horas.
Dados com mais de 90 dias devem ser expurgados automaticamente. */

module.exports = routes;