const Bank = require('../model/Bank');
const User = require('../model/User');

module.exports = {
    async createUserDeposit(request, response) {
        const { idUser, value, description, status } = request.body;

        const existUser = await User.find().where('name', 'carlos');

        response.json(existUser);

        if (existUser) {
            const bank = await Bank.create({
                idUser,
                value,
                description,
                status
            });
    
            if (bank) {
                return response.json({
                    status: true,
                    content: bank,
                    message: 'Deposito no valor de: ' +value+ ' efetuado com sucesso!'
                });
            } else {
                return response.json({
                    status: false,
                    message: 'Não foi possível efeturar o deposito'
                });
            }
        } else {
            return response.json({
                status: false,
                message: 'Usuário informado não esta cadastrado.'
            });
        }

    },

    async extractUser(request, response) {
       const extract = await Bank.find().where('idUser', request.params.id);

       const teste = Bank.aggregate((
           {$group: {_id: "request.params.id", total: {$sum: "$value"}}}
       ))
       return response.json(teste);
    }
};